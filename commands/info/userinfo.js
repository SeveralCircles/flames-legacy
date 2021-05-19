const commando = require('discord.js-commando');
const Discord = require('discord.js');
const get_userdata = require("../../data/get_userdata")
const get_guilddata = require("../../data/get_guilddata")
const rank = require("../../features/rank")
const info = require ("../../features/info");
const message = require('../../events/message');
const achievements = require("../../features/achievements")
const get_globaldata = require ("../../data/get_globaldata")
const analysis = require("../../features/analysis")
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
    async run(msg) {
        try {
        let member = msg.member
        // try {member = msg.mentions.users.first()} catch (e) {member = msg.member}
        // if (member == undefined) member = msg.member;
        // if (member == null) member = msg.member;
        // msg.channel.startTyping();
        var message = await msg.channel.send(info.wait(msg.member, this.client, "Get User Data"))
        let data = get_userdata.byId(member.id);
        let guild = data.firstSeen
        let gd = get_guilddata.byId(guild);
        let now = new Date();
        let sent = null;
        let args = msg.content.split(" ");
        // if (args[1] == "topics") {
        //     let topics = []
        //     let embed = new Discord.MessageEmbed()
        //     .setAuthor("Flames User Data: Topics", member.user.displayAvatarURL())
        //     .setTitle(member.displayName)
        //     .setTimestamp()
        //     .setFooter("Flames", this.client.user.displayAvatarURL());
        //     data.entities.forEach( element => {
        //         if(!topics.includes(element)){ 
        //             embed.addField(element, analysis.count(data.entities, element));
        //             topics.push(element);
        //         }
        //     });
        //     message.edit(embed);
        //     return;
        // }
        let average = (data.averageSentiment.reduce((a, b) => a + b, 0)) / data.averageSentiment.length;
        let gdata = get_globaldata.getValues();
        console.log("Average:" + average);
        if (average > 94) sent = "Positive";
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
        .addField("Favorite Topic", analysis.findMost(data.entities))
        .addField("Achievements Collected", data.achievements.length + "/" + achievements.allAchievementsCount + " (" + (data.achievements.length / achievements.allAchievementsCount) * 100 + "%)", true)
        .addField("Global Contribution", (Math.round((data.score / gdata.score) * 10000)) / 100 + "%", true)
        .setTimestamp()
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
    } catch (e) {
        message.edit(info.userDataCorrupt(msg.member, this.client, e))
        console.log(e)
    }
    }
}
