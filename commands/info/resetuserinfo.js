const commando = require('discord.js-commando');
const Discord = require('discord.js');
const get_userdata = require("../../data/get_userdata")
const get_guilddata = require("../../data/get_guilddata")
var random = Math.random();
const rank = require("../../features/rank")
const info = require ("../../features/info");
const message = require('../../events/message');
module.exports = class UserInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'userdatareset',
            aliases: ['resetmydata'],
			group: 'info',
			memberName: 'userdatareset',
			description: 'Completetly and irreversably deletes all your userdata.',
            guildOnly: true
            });  
}
    async run(msg, args) {
        let messaage = await msg.channel.send(info.wait(msg.member, this.client, "Reset User Data"))
        console.log(args)
        if (args != "burnitdown") {
            random = Math.random();
            let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor("Warning", msg.member.user.displayAvatarURL())
            .setTitle(msg.member.displayName + ", are you sure?")
            .setDescription("**THIS CANNOT BE UNDONE!**")
            .addField("This will irreversably delete the following data:", "Your Flames Score, Your first seen at server, your sentiment data, and any clearances you posses.")
            .addField("If you still wish to reset your data, please type \\userdatareset burnitdown", "")
            .setFooter("Flames", this.client.user.displayAvatarURL());
            message.edit(embed);
        } else {
            let defaults = get_userdata.defaults;
            defaults.firstSeen = msg.guild.id;
            get_userdata.writeById(msg.member.id, defaults);
            let embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Operation Completed", msg.member.user.displayAvatarURL())
            .setTitle(msg.member.displayName + ", your data has been reset successfully.")
            .setDescription("Thank you for using Flames.")
            .setFooter("Flames", this.client.user.displayAvatarURL());
            message.edit(embed);
        }
    }}