const commando = require("discord.js-commando");
const real = require("./upgrademultiplier")
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
async run (msg) {
  real.run(msg, this.client)  
}
}
