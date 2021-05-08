const commando = require('discord.js-commando');
const Discord = require('discord.js');
const get_userdata = require("../../data/get_userdata")
const get_guilddata = require("../../data/get_guilddata")
const rank = require("../../features/rank")
const info = require ("../../features/info")
module.exports = class UserInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'userdata',
            aliases: ['mydata'],
			group: 'info',
			memberName: 'userdata',
			description: 'Gets your user information.',
            guildOnly: true
            });  
}
    async run(msg, args) {
        try {
        let member = msg.member
        // try {member = msg.mentions.users.first()} catch (e) {member = msg.member}
        // if (member == undefined) member = msg.member;
        // if (member == null) member = msg.member;
        // msg.channel.startTyping();
        let message = await msg.channel.send(info.wait(msg.member, this.client, "Get User Data"))
        let data = get_userdata.byId(member.id);
        let guild = data.firstSeen
        let gd = get_guilddata.byId(guild);
        let now = new Date();
        let sent = null;
        let average = (data.averageSentiment.reduce((a, b) => a + b, 0)) / data.averageSentiment.length;
        console.log("Average:" + average);
        if (average > 0.1) sent = "Positive";
        else if (average < 0) sent = "Negative";
        else sent = "Neutral";
        let embed = new Discord.MessageEmbed()
        .setAuthor("Flames User Data", member.user.displayAvatarURL())
        .setTitle(member.displayName)
        .setDescription("Member of " + msg.guild.name + " since " + member.joinedAt.toDateString() + " (" + Math.abs(Math.round((member.joinedAt.getTime()-now.getTime()) / (1000 * 3600 * 24))) + " days ago)")
        .addField("Flames Score", data.score, true)
        .addField("First Seen at", gd.name + " ", true)
        .addField("Rank", rank.getRank(data.score), true)
        .addField("To Next Rank", rank.toNext(data.score), true)
        .addField("Emotion", sent, true)
        .setFooter("Flames", this.client.user.displayAvatarURL());
        if(member.hasPermission('ADMINISTRATOR')) embed.setColor(0xa103fc);
        else if (member.hasPermission('MANAGE_MESSAGES')) embed.setColor(0x00e1ff);
        if (get_userdata.byId(member.id).verified) embed.setColor("GREEN");
        if (Math.abs(Math.round((member.joinedAt.getTime()-now.getTime()) / (1000 * 3600 * 24))) % 365 === 0) {
            embed.setDescription("**Joined " + msg.guild.name + " " + Math.abs(Math.round((member.joinedAt.getTime()-now.getTime()) / (1000 * 3600 * 24)))/365 + " years ago today.**");
            embed.setColor(0xfc038c);
        }
        // msg.channel.stopTyping();
        message.edit(embed);
    } catch (e) {console.log(e)}
    }
}
