import commando = require('discord.js-commando');
import Discord = require('discord.js');
import get_userdata = require("../../data/get_userdata")
import info = require ("../../features/info");
import get_globaldata = require ("../../data/get_globaldata")
import gamerpoints = require("../../features/gamerpoints");

export async function run(msg, client) {
        let args = msg.content.split(" ");
        let data = await get_userdata.byId(msg.member.id);
        let gdata = await get_globaldata.getValues();
        let message = await msg.channel.send(info.wait(msg.member, this.client, "Retrieve Wallet Information"));
        if (!data.betaTester) {
            msg.reply("you must become a member of the Flames Beta Program before you can use Flames. For more information, run the \\enroll command.")
            return;
        }  
        switch (args[1]) {
            case "exchange":
                if (isNaN(args[2])) {
                    let embed = new Discord.MessageEmbed()
                    .setAuthor("Flames Wallet", msg.member.user.displayAvatarURL())
                    .setTitle("Whoops, try that one again.")
                    .setDescription(msg.member.displayName + ", you need to specify how many Gamer Points you wish to recieve.")
                    .setTimestamp()
                    .setFooter("Flames", client.user.displayAvatarURL());
                    message.edit(embed);
                    return;
                } else {
                    var gp = Number(args[2]);
                    var fp = Math.round(gp * gamerpoints.exchangeRate);
                    if (fp > data.score) {
                        let embed = new Discord.MessageEmbed()
                        .setAuthor("Flames Wallet", msg.member.user.displayAvatarURL())
                        .setTitle("Transaction Declined")
                        .setDescription(msg.member.displayName + ", you do not have the required amount of FP to exchange.")
                        .addField("Required FP", fp)
                        .setTimestamp()
                        .setFooter("Flames", client.user.displayAvatarURL());
                        message.edit(embed);
                        return;
                    }
                    let embed = new Discord.MessageEmbed()
                    .setAuthor("Flames Wallet", msg.member.user.displayAvatarURL())
                    .setTitle("Exchange Flames Points for Gamer Points")
                    .setDescription(msg.member.displayName + ", please review the transaction and confirm that you wish to complete it.")
                    .addField("FP", fp, true)
                    .addField("->", "->", true)
                    .addField("GP", gp, true)
                    .setTimestamp()
                    .setFooter("Flames | ✅ to confirm, 🔴 to reject.", this.client.user.displayAvatarURL());
                    message.edit(embed);
                    message.react('✅').then(r => {
                        message.react('🔴');
                });
                message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '🔴'),
                        { max: 1, time: 30000 }).then(collected => {
                                if (collected.first().emoji.name == '✅') {
                                    message.edit(info.wait(msg.member, this.client, "Exchange FP for GP"));
                                    data.score -= fp;
                                    data.gamerpoints += gp;
                                    gdata.score -= fp;
                                    get_userdata.writeById(msg.member.id, data);
                                    get_globaldata.writeValues(gdata);
                                    let embed2 = new Discord.MessageEmbed()
                                    .setAuthor("Flames Wallet", msg.member.user.displayAvatarURL())
                                    .setTitle("Transaction Complete")
                                    .setDescription(msg.member.displayName + ", your balance has been updated.")
                                    .setTimestamp()
                                    .setColor("GREEN")
                                    .setFooter("Flames", this.client.user.displayAvatarURL());
                                    message.edit(embed2);

                                }
                                else
                                        message.edit("The transaction was cancelled.");
                        }).catch(() => {
                                message.edit("The transaction has expired.");
                        });

                break
                }
                
            default:
                let embed = new Discord.MessageEmbed()
                .setAuthor("Flames Wallet", msg.member.user.displayAvatarURL())
                .setTitle(msg.member.displayName + "'s wallet")
                .addField("Balance", data.gamerpoints + " GP", true)
                .addField("Exchange Rate", "1 GP costs " + gamerpoints.exchangeRate + " FP.", true)
                .addField("You Can Get", Math.round(data.score / gamerpoints.exchangeRate), true)
                .addField("Available Options (run as command starting with \\mygp or \\wallet)", "To exchange Flames Points for Gamer Points: exchange <desired GP>")
                .setTimestamp()
                .setFooter("Flames", client.user.displayAvatarURL());
                message.edit(embed);
                break;
        }
    }