const commando = require("discord.js-commando");
const real = require("./resetuserinfo")
module.exports = class ResetUserInfoCommand extends commando.Command {
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
async run(msg) {
    real.run(msg, client);
}
}