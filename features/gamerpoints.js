const get_globaldata = require("../data/get_globaldata");
var gdata = get_globaldata.getValues()
const ulist = require("../data/ulist.json");
const get_userdata = require("../data/get_userdata");
const info = require("./info");
const Discord = require("discord.js");
module.exports = {
    exchangeRate: Math.round((gdata.score / ulist.ulist.length) / 10),
    sync: function() {
        if (gdata.gamerpoints <= 100) {
            console.log("Gamer Bank running out of GP! Adding random amount");
            gdata.gamerpoints += Math.round(Math.random() * 1000);
        }
    },
    exchangePossible(fp) {
        let rate = this.exchangeRate();
        if (Math.round(fp/rate) < 1) return false;
        else return true;
    },
    purchaseDialog(member, message, amount, item, client) {
        let data = get_userdata.byId(message.member.id);
        if (data.gamerpoints < amount) {
            message.edit(info.notEnoughGP(member, client, "Purchase " + item, amount))
        } else {
            let channel = message.channel;
            message.delete();
            let embed = new Discord.MessageEmbed()
            .setAuthor("Purchase Confirmation", member.user.displayAvatarURL())
            .setTitle(member.displayName + ", please review the following details and confirm if you wish to proceed.")
            .addField("Item", item, true)
            .addField("Cost", amount + " GP", true)
            .addField("Starting Balance", data.gamerpoints, true)
            .addField("Ending Balance", data.gamerpoints - amount, true)
            .setFooter("Flames | Flames will never charge real money for its services. | ✅ to confirm, 🔴 to reject.", client.user.displayAvatarURL());
            var message2 = await channel.send(embed);
            message2.react('✅').then(r => {
                message2.react('🔴');
        });
        message2.awaitReactions((reaction, user) => user.id == member.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '🔴'),
                { max: 1, time: 30000 }).then(collected => {
                        if (collected.first().emoji.name == '✅') {
                            message2.edit(info.wait(member, this.client, "Purchase using GP"));
                            data.gamerpoints -= amount;
                            get_userdata.writeById(msg.member.id, data);
                            let embed2 = new Discord.MessageEmbed()
                            .setAuthor("Flames Wallet", msg.member.user.displayAvatarURL())
                            .setTitle("Transaction Complete")
                            .setDescription(msg.member.displayName + ", your balance has been updated.")
                            .addField("New Balance", data.gamerpoints)
                            .setTimestamp()
                            .setColor("GREEN")
                            .setFooter("Flames", this.client.user.displayAvatarURL());
                            message2.edit(embed2);
                            return true;
                        }
                        else
                                message2.edit("The transaction was cancelled.");
                                return false;
                }).catch(e => {
                        console.log(e);
                        message2.edit("The transaction has expired.");
                        return false;
                });
        }
    }
}