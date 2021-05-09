const commando = require('discord.js-commando');
const Discord = require('discord.js');
const get_userdata = require("../../data/get_userdata")
const get_guilddata = require("../../data/get_guilddata")
const rank = require("../../features/rank")
const info = require ("../../features/info")
const get_globaldata = require("../../data/get_globaldata")
module.exports = class GlobalInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'globalinfo',
            aliases: ['ginfo'],
			group: 'info',
			memberName: 'globalinfo',
			description: 'Returns Global Ranking Information',
            guildOnly: true
            });  
    }
    async run(msg, args) {
        let message = await msg.channel.send(info.wait(msg.member, this.client, "Synchronize Global Ranking Information"));
        rank.sync();
        await message.edit(info.wait(msg.member, this.client, "Retrieve Global Ranking Information"))
        let gdata = get_globaldata.getValues();
        let up = gdata.dailyChange >= 0;
        let embed = new Discord.MessageEmbed()
        .setAuthor(msg.member.displayName + "'s request", msg.member.user.displayAvatarURL())
        .setTitle("Flames Global Ranking Information")
        .setTimestamp()
        .addField("X Rank Threshold", rank.thresholds[6], true)
        .addField("S Rank Threshold", rank.thresholds[5], true)
        .addField("A Rank Threshold", rank.thresholds[4], true)
        .addField("B Rank Threshold", rank.thresholds[3], true)
        .addField("C Rank Threshold", rank.thresholds[2], true)
        .addField("D Rank Threshold", rank.thresholds[1], true)
        .addField("F Rank Threshold", rank.thresholds[0], true)
        // .addField("Top Score", rank.scores[rank.scores.length-1])
        .setColor("DARK_VIVID_PINK")
        .setFooter("Flames", this.client.user.displayAvatarURL());
        let percent = 0
        if (up){
            percent = (gdata.score / (gdata.score - gdata.dailyChange)) - 100
            embed.addField("Global Flames Score", gdata.score + " (up " + gdata.dailyChange + " points/" + percent + "%)")
        } 
        else {
            percent = (gdata.score - (gdata.score + gdata.dailyChange))/Math.abs(gdata.score + gdata.dailyChange); 
            embed.addField("Global Flames Score", gdata.score + " (down " + Math.abs(gdata.dailyChange) + " points/" + percent + "%)")
        } 
        message.edit(embed);        
    }
}