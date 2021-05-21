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
const { userDataCorrupt } = require('../../features/info');
module.exports = class MultiplierCommand extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'upgrademuliplier',
            aliases: ['mupgrade', "xupgrade"],
			group: 'info',
			memberName: 'upgrademultiplier',
			description: 'Allows you to spend your Gamer Points to increase your FP multiplier.',
            guildOnly: true
            });  
}
    
    async run(msg) {
        var data = get_userdata.byId(msg.member);
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
        .setFooter("Flames |🔼 to upgrade, 🔴 to cancel.", this.client.user.displayAvatarURL());
        var message = await msg.channel.send(embed)
        message.react('🔼').then(r => {
            message.react('🔴');
        });
        message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '🔼' || reaction.emoji.name == '🔴'),
        { max: 1, time: 30000 }).then(collected => {
                if (collected.first().emoji.name == '1️⃣') {
                    message.reactions.removeAll();
                    if (!data.gp >= multiplierCost) {
                        message.edit(info.notEnoughGP(msg.member, this.client, "Purchase Multiplier Increase", multiplierCost));
                        return;
                    }
                    message.edit(gamerpoints.purchaseDialog(msg.member, multiplierCost, "Multiplier Increase", this.client, data));
                    message.react('✅').then(r => {
                        message.react('🔴');
                });
                message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '🔴'),
                        { max: 1, time: 30000 }).then(collected => {
                                if (collected.first().emoji.name == '✅') {
                                    data.gp -= multiplierCost;
                                    data.multiplier += 0.1;
                                    get_userdata.writeById(msg.member.id, data);
                                    message.reactions.removeAll();
                                    message.edit(gamerpoints.purchaseConfirm(msg.member, "Multiplier Increase", this.client, data.gp));
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
    }}