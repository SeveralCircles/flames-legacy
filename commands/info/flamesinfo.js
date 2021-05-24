const { MessageEmbed } = require("discord.js");
const { client } = require("../../bot");
const flamesdata = require('../../data/flamesdata.json')
const index = require("../../index")
module.exports = class GlobalInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'flamesinfo',
            aliases: ['finfo', 'fdata', 'flamesdata'],
			group: 'info',
			memberName: 'flamesinfo',
			description: 'Returns technical data about what Flames is doing.',
            guildOnly: false
            });  
    }
    async run(msg) {
        let embed = new MessageEmbed()
        .setAuthor("Flames Technical Information", msg.author.displayAvatarURL())
        .setTitle("Flames")
        .setDescription("version " + flamesdata.version)
        .addField("Next Ranking Information Update", index.updateJob.nextInvocation().toDateString(), true)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter("Uptime")
        .setTimestamp(client.readyAt);
    }
}