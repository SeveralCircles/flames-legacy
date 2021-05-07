const commando = require('discord.js-commando');
const Discord = require('discord.js');
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
    let embed = new Discord.MessageEmbed()
    .setAuthor("Flames Documentation", msg.member.user.displayAvatarURL())
    .setTitle(msg.member.displayName + ", click here to see the documentation.")
    .setDescription("Opens in your browser.")
    .setURL("https://aidanveney.gitbook.io/flames/")
    .setFooter("Flames", this.client.user.displayAvatarURL());
    msg.channel.send(embed);
}
}