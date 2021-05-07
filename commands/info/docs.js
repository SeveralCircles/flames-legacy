const commando = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class Docs extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'docs',
            aliases: ['documentation'],
			group: 'info',
			memberName: 'docs',
			description: 'Links you to the documentation.',
            guildOnly: false
            });  
}
async run(msg, args) {
    let embed = new Discord.MessageEmbed()
    .setAuthor("Flames Documentation", msg.member.user.displayAvatarURL())
    .setTitle(msg.member.displayName + ", click here to see the documentation.")
    .setDescription("Opens in your browser.")
    .setURL("https://aidanveney.gitbook.io/flames/")
    .setFooter("Flames", this.client.user.displayAvatarURL());
    msg.channel.send(embed);
}
}