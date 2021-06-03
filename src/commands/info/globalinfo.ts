import commando = require('discord.js-commando');
import Discord = require('discord.js');
import rank = require("../../features/rank")
import info = require ("../../features/info")
import get_globaldata = require("../../data/get_globaldata")
const ulist = require("../../data/user/ulist.json")
const flamesdata = require("../../data/global/flamesdata.json");
import gamerpoints = require ("../../features/gamerpoints")
import index = require("../../index");
import message = require('../../events/message');
import get_userdata = require("../../data/get_userdata")
export async function run(msg: Discord.Message, client: Discord.Client) {
        let data = get_userdata.byId(msg.member.id);
        if (!data.betaTester) {
            msg.reply("you must become a member of the Flames Beta Program before you can use Flames. For more information, run the \\enroll command.")
            return;
        }
        let args = msg.content.split(" ");
        let message = await msg.channel.send(info.wait(msg.member, client, "Retrieve Global Ranking Information"))
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
        .setFooter("Flames ver. " + flamesdata.version + " @ " + msg.guild.nameAcronym, client.user.displayAvatarURL());
        let percent = 0
        if (up){
            percent = (Math.round(10000 * ((gdata.score - (gdata.score - gdata.dailyChange))/Math.abs(gdata.score - gdata.dailyChange))))/100;
            embed.addField("Global Flames Score", gdata.score + " (up " + gdata.dailyChange + " points/" + percent + "%)")
        } 
        else {
            percent = Math.round(10000 * (gdata.score - (gdata.score + gdata.dailyChange))/Math.abs(gdata.score + gdata.dailyChange))/100; 
            embed.addField("Global Flames Score", gdata.score + " (down " + Math.abs(gdata.dailyChange) + " points/" + percent + "%)")
        } 
        embed.addField("Average Flames Score", gdata.score/ulist.ulist.length, true);
        embed.addField("Number of Participants", ulist.ulist.length, true);
        embed.addField("Progress towards Global Goal", gdata.score + "/100000 (" + (Math.round((gdata.score/100000)*10000))/100 + "%)", true)
        embed.addField("GP Cost", gamerpoints.exchangeRate + " FP");
        message.edit(embed);
    }