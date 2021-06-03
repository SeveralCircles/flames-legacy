const commando = require("discord.js-commando")
const real = require("./guildinfo")
module.exports = class GuildInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'guilddata',
            aliases: ['serverdata', 'sdata', 'gdata'],
			group: 'info',
			memberName: 'guilddata',
			description: 'Gets the current guild\'s information.',
            guildOnly: true
            });  
}
async run(msg) {
    real.run(msg, this.client);
}
}