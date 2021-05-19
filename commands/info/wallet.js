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
const gamerpoints = require("../../features/gamerpoints");
const { exchangeRate } = require('../../features/gamerpoints');
module.exports = class WalletCommand extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'wallet',
            aliases: ['mygp'],
			group: 'info',
			memberName: 'wallet',
			description: 'Allows you to manage your Gamer Points.',
            guildOnly: true
            });  
}
    async run(msg) {
        let args = msg.content.split(" ");
        let data = await get_userdata.byId(msg.member.id);
        let gdata = await get_globaldata.getValues();
        let message = await msg.channel.send(info.wait(msg.member, this.client, "Retrieve Wallet Information"));
        switch (args[1]) {
            case "exchange":
                if (isNaN(args[2])) {
                    let embed = new Discord.MessageEmbed()
                    .setAuthor("Flames Wallet", msg.member.user.displayAvatarURL())
                    .setTitle("Whoops, try that one again.")
                    .setDescription(msg.member.displayName + ", you need to specify how many Flames Points you wish to exchange.")
                    .setTimestamp()
                    .setFooter("Flames", this.client.user.displayAvatarURL());
                    message.edit(embed);
                    return;
                } else {
                    let gp = Number(args[2]);
                    if (fp > data.score) {
                        let embed = new Discord.MessageEmbed()
                        .setAuthor("Flames Wallet", msg.member.user.displayAvatarURL())
                        .setTitle("Transaction Declined")
                        .setDescription(msg.member.displayName + ", you do not have that amount of FP to exchange.")
                        .setTimestamp()
                        .setFooter("Flames", this.client.user.displayAvatarURL());
                        message.edit(embed);
                        return;
                    }
                    console.log("GPER:" + gamerpoints.exchangeRate)
                    let fp = Math.round(gp * gamerpoints.exchangeRate);
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
                                    .addField("FP",  + "-" + fp, true)
                                    .addField("GP", + "+" + gp, true)
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
                .addField("Available Options (run as command starting with \\mygp or \\wallet)", "To exchange Flames Points for Gamer Points: exchange <desired GP>")
                .setTimestamp()
                .setFooter("Flames", this.client.user.displayAvatarURL());
                message.edit(embed);
                break;
        }
    }
}