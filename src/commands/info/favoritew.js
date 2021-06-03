const commando = require("discord.js-commando")
const real = require("./favorite")
module.exports = class FavoriteCommand extends commando.Command {
	constructor(client) {
		super(client, {
            name: 'favorite',
            aliases: ['likeserver'],
			group: 'info',
			memberName: 'favorite',
			description: 'Sets the current server as your favorite.',
            guildOnly: true
            });  
}
async run(msg) {
    real.run(msg, this.client);
}
}