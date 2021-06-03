const commando = require("discord.js-commando")
const real = require("./userinfo")
module.exports = class UserInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'userdata',
            aliases: ['mydata'],
			group: 'info',
			memberName: 'userdata',
			description: 'Gets your user information.',
            guildOnly: true
            });  
}
async run(msg) {
    real.run(msg, this.client);
}
}