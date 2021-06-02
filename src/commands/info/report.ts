const bugsnag = require("../../features/bugsnag")
const commando = require('discord.js-commando');
const Discord = require('discord.js');
const get_userdata = require("../../data/get_userdata");
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
    async run(msg) {
        let data = get_userdata.byId(msg.member.id);
        if (!data.betaTester) {
            msg.reply("you must become a member of the Flames Beta Program before you can use Flames. For more information, run the \\enroll command.")
            return;
        }
        bugsnag.report(new Error(msg.content));
        msg.reply("Reported via Bugsnag.")
    }}