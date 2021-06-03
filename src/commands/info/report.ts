import bugsnag = require("../../features/bugsnag")
import commando = require('discord.js-commando');
import Discord = require('discord.js');
import get_userdata = require("../../data/get_userdata");
export async function run(msg, client) {
        let data = get_userdata.byId(msg.member.id);
        if (!data.betaTester) {
            msg.reply("you must become a member of the Flames Beta Program before you can use Flames. For more information, run the \\enroll command.")
            return;
        }
        bugsnag.notify(new Error(msg.content))
        msg.reply("Reported via Bugsnag.")
    }