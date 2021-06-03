const commando = require('discord.js-commando');
const real = require("./globalinfo")
module.exports = class GlobalInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'globalinfo',
            aliases: ['ginfo'],
			group: 'info',
			memberName: 'globalinfo',
			description: 'Returns Global Ranking Information',
            guildOnly: true
            });  
    }
async run(msg) {
    real.run(msg, this.client);
}
}