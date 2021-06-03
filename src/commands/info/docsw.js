const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const real = require("./docs")
module.exports = class Docs extends Command {
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
    return await real.run(msg, this.client);
}
}