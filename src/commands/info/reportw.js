const commando = require('discord.js-commando')
const real = require("./report")
module.exports = class ReportCommand extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'report',
            aliases: ['snag', 'bugsnag', 'error'],
			group: 'info',
			memberName: 'report',
			description: 'Allows you to report any issues you encounter to the developers via Bugsnag.',
            guildOnly: true
            });  
}
async run (msg, args) {
    real.run(msg, args, this.client)
}
}