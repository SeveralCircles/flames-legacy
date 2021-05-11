const commando = require('discord.js-commando');
const Discord = require('discord.js');
const get_userdata = require("../../data/get_userdata")
const get_guilddata = require("../../data/get_guilddata")
const rank = require("../../features/rank")
const info = require ("../../features/info")
const get_globaldata = require("../../data/get_globaldata")
function convertToNiceTime(days)  {
    let years = 0
    let months = 0
    let weeks = 0
    let remain = 0;
    while (days) {
        if (days >= 365) {
            years++;
            days -= 365
        } else if (days >= 30) {
            months++;
            days -=30;
        } else if (days >= 7) {
            weeks++;
            days -= 7;
        } else {
            remain++;
            days--;
        }
    }
    if (years > 0) return years + " years, " + months + " months, " + weeks + " weeks, and" + remain + " days.";
    else if (months > 0 ) return months + " months, " + weeks + " weeks, and" + remain + " days.";
    else if (weeks > 0) return weeks + " weeks and" + remain + " days.";
    else return remain + " days"
}
module.exports = class HiCommand extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'hi',
            aliases: ['hello'],
			group: 'info',
			memberName: 'hi',
			description: 'Get your daily bonuses and some fun information.',
            guildOnly: true
            });  
    }
    
    async run(msg, args) {
        let data = get_userdata.byId(msg.member.id);
        let date = new Date();
        let streakBonus = 0;
        
        let message = await msg.channel.send(info.wait(msg.member, this.client, "Daily Check-In"))
        let embed = new Discord.MessageEmbed()
        .setAuthor("Daily Check-in", msg.member.user.displayAvatarURL())
        .setTitle("Hello, " + msg.member.displayName + "!")
        .setColor("GREEN")
        .setFooter("Flames", this.client.user.displayAvatarURL());
        if (data.lastStreak == date.getDay()) {
            message.edit("Come back tommorow for another bonus, " + msg.member.displayName)
            return;
        } else if (data.lastStreak == date.getDay() + 1 || (data.lastStreak == 6 && date.getDay == 0)) {
            data.streak++;
            Math.min(streakBonus = 2^(data.streak/7, 16384));
            if (data.streak % 7 == 0 && data.streak != 0) {
                embed.setDescription("Congrats on your " + data.streak/7 + " week streak! Keep it up!");
            } else if (data.streak % 30 == 0 && data.streak != 0) {
                embed.setDescription("Wow, congrats on your " + data.streak/29 + " month streak! That's impressive!");
            } else if (data.streak % 365 == 0 && data.streak != 0) {
                embed.setDescription("Incredible, you've kept a streak for " + data.streak/365 + "years! That's amazing!");
            }
        }
        data.lastStreak = date.getDay();
        data.score += streakBonus;
        embed.addField("Streak", convertToNiceTime(data.streak), true);
        embed.addField("Daily Bonus", streakBonus, true);
        embed.addField("Flames Score", data.score, true);
        embed.addField("Rank", rank.getRank(data.score), true);
        embed.addField("To Next Rank", rank.toNext(data.score), true);
        embed.setTimestamp();
        message.edit(embed);
        get_userdata.writeById(msg.member.id, data);
    }   
    
}