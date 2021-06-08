const commando = require("discord.js-commando");
const real = require("./wallet")
module.exports = class WalletCommand extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'wallet',
            aliases: ['mygp'],
			group: 'info',
			memberName: 'wallet',
			description: 'Allows you to manage your Gamer Points.',
            guildOnly: true
            });  
}
async run(msg) {
    real.run(msg, this.client);
}}