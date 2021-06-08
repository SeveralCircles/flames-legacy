const commando = require('discord.js-commando')
const real = require("./enroll")
module.exports = class EnrollCommand extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'enroll',
            aliases: ['joinbeta'],
			group: 'info',
			memberName: 'enroll',
			description: 'Allows you to join the Flames Beta Program.',
            guildOnly: true
            });  
}
async run(msg, args) {
    await real.run(msg, args, this.client);
}
}