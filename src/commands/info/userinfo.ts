import commando = require('discord.js-commando');
import Discord = require('discord.js');
import get_userdata = require("../../data/get_userdata")
import get_guilddata = require("../../data/get_guilddata")
import rank = require("../../features/rank")
import info = require ("../../features/info");
import message = require('../../events/message');
import achievements = require("../../features/achievements")
import get_globaldata = require ("../../data/get_globaldata")
import analysis = require("../../features/analysis")
import bugsnag = require("../../features/bugsnag")
export async function run(msg, client) {
        let data = get_userdata.byId(msg.member.id);
        if (!data.betaTester) {
            msg.reply("you must become a member of the Flames Beta Program before you can use Flames. For more information, run the \\enroll command.")
            return;
        }  
        try {
        let member = msg.member;
        // try {member = msg.mentions.users.first()} catch (e) {member = msg.member}
        // if (member == undefined) member = msg.member;
        // if (member == null) member = msg.member;
        // msg.channel.startTyping();
        var message = await msg.channel.send(info.wait(msg.member, client, "Get User Data"))
        let guild = data.firstSeen
        let gd = get_guilddata.byId(guild);
        if (gd == get_guilddata.defaults) {
            if (msg.guild.id != data.firstSeen) {
                message.edit(info.resetFirstSeen(msg.member, client));
                setTimeout(function() {}, 5000);
            }
        }
        let now = new Date();
        let sent = null;
        let args = msg.content.split(" ");
        // if (args[1] == "topics") {
        //     let topics = []
        //     let embed = new Discord.MessageEmbed()
        //     .setAuthor("Flames User Data: Topics", member.user.displayAvatarURL())
        //     .setTitle(member.displayName)
        //     .setTimestamp()
        //     .setFooter("Flames", client.user.displayAvatarURL());
        //     data.entities.forEach( element => {
        //         if(!topics.includes(element)){ 
        //             embed.addField(element, analysis.count(data.entities, element));
        //             topics.push(element);
        //         }
        //     });
        //     message.edit(embed);
        //     return;
        // }
        if (args[1] == "nonotify") {
            if (data.notify != true) {
                msg.reply("you will now recieve notifications again.")
            } else msg.reply("you will no longer recieve achievements or daily bonuses from Flames.")
        }
        let average = (data.averageSentiment.reduce((a, b) => a + b, 0)) / data.averageSentiment.length;
        let gdata = get_globaldata.getValues();
        console.log("Average:" + average);
        if (average > 50 && average <= 80) sent = "Slighty Positive"
        else if (average > 80 && average <= 100) sent = "Quite Positive"
        else if (average >= 100) sent = "Overwhelmingly Positive"
        else if (average < 0) sent = "Negative"
        else sent = "Neutral";
        let embed = new Discord.MessageEmbed()
        .setAuthor("Flames User Data", member.user.displayAvatarURL())
        .setTitle(member.displayName + " from " + await get_guilddata.byId(data.favoriteGuild).name)
        .setDescription("Member of " + msg.guild.name + " since " + member.joinedAt.toDateString() + " (" + Math.abs(Math.round((member.joinedAt.getTime()-now.getTime()) / (1000 * 3600 * 24))) + " days ago)")
        .addField("Flames Score", data.score, true)
        .addField("First Seen at", gd.name + " ", true)
        .addField("Rank", rank.getRank(data.score), true)
        .addField("To Next Rank", rank.toNext(data.score), true)
        .addField("Emotion", sent, true)
        .addField("Favorite Topic", analysis.findMost(data.entities), true)
        .addField("Achievements Collected", data.achievements.length + "/" + achievements.allAchievementsCount + " (" + (data.achievements.length / achievements.allAchievementsCount) * 100 + "%)", true)
        .addField("Global Contribution", (Math.round((data.score / gdata.score) * 10000)) / 100 + "%", true)
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter("\\mydata nonotify to disable notifications. | Flames @ " + msg.guild.nameAcronym, client.user.displayAvatarURL());
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
        message.edit(info.userDataCorrupt(msg.member, client, e))
        console.log(e)
        bugsnag.notify(e);
    }
    }
