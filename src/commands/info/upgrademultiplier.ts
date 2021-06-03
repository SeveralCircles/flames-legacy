import commando = require('discord.js-commando');
import Discord = require('discord.js');
import get_userdata = require("../../data/get_userdata")
import info = require ("../../features/info");
import gamerpoints = require("../../features/gamerpoints");
export async function run(msg, client) {
        var data = await get_userdata.byId(msg.member.id);
        if (!data.betaTester) {
            msg.reply("you must become a member of the Flames Beta Program before you can use Flames. For more information, run the \\enroll command.")
            return;
        }  
        var multiplierCost = Math.round(100 * data.multiplier);
        if (data.multiplier == undefined) data.multiplier = 1.0;
        let embed = new Discord.MessageEmbed()
        .setAuthor("Flames Shop", msg.member.user.displayAvatarURL())
        .setTitle(msg.member.displayName + ", here is information on how to upgrade your multiplier.")
        .setDescription("The multiplier is amount each message score you recieve, positive or negative, is multiplied by to determine how much it affects your score. Having a higher multiplier can be very good, but it also puts you at a much higher risk.")
        .addField("Current Multiplier", data.multiplier + "x", true)
        .addField("Cost to Upgrade", multiplierCost)
        .addField("Multipier after Upgrade", (data.multiplier + 0.1) + "x", true)
        .setTimestamp()
        .setFooter("Flames |🔼 to upgrade, 🔴 to cancel.", client.user.displayAvatarURL());
        var message = await msg.channel.send(embed)
        message.react('🔼').then(r => {
            message.react('🔴');
        });
        message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '🔼' || reaction.emoji.name == '🔴'),
        { max: 1, time: 30000 }).then(collected => {
                if (collected.first().emoji.name == '🔼') {
                    message.reactions.removeAll();
                    if ((data.gamerpoints - multiplierCost) < 0) {
                        message.edit(info.notEnoughGP(msg.member, client, "Purchase Multiplier Increase", multiplierCost));
                        return;
                    }
                    message.edit(gamerpoints.purchaseDialog(msg.member, multiplierCost, "Multiplier Increase", this.client, data));
                    message.react('✅').then(r => {
                        message.react('🔴');
                });
                message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '🔴'),
                        { max: 1, time: 30000 }).then(collected => {
                                if (collected.first().emoji.name == '✅') {
                                    data.gamerpoints -= multiplierCost;
                                    data.multiplier += 0.1;
                                    get_userdata.writeById(msg.member.id, data);
                                    message.reactions.removeAll();
                                    message.edit(gamerpoints.purchaseConfirm(msg.member, "Multiplier Increase", client, data.gamerpoints));
                                }
                                else
                                        message.edit("The transaction was cancelled.");
                        }).catch(() => {
                                message.edit("The transaction has expired.");
                        });

                }
                else
                        message.edit("The transaction was cancelled.");
        }).catch(() => {
                message.edit("The transaction has expired.");
        });
    }