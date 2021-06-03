import Discord = require('discord.js');
import get_userdata = require("../../data/get_userdata");
export async function run(msg, client: Discord.Client) {
        let data = get_userdata.byId(msg.member.id);
        let args = msg.content.split(" ");
        if (!data.betaTester) {
            if (args[1] == "lightitup") {
                msg.delete;
                msg.reply("thanks. You are now being enrolled and you should be able to start using Flames within 10 minutes.")
                data.betaTester = true;
            } else {
            let embed = new Discord.MessageEmbed()
            .setAuthor("Flames Beta Program Enrollment", msg.author.displayAvatarURL())
            .setTitle("Enroll in the Flames Beta")
            .setDescription(msg.member.displayName + ", to enroll in the Flames beta, click the link above to view the applicable terms (please actually read them, they are important!), and then follow the instructions on that page to continue the enrollment.")
            .setTimestamp()
            .setURL("https://severalcircles.com/index.php/8-flames/2-flames-beta-program-enrollment")
            .setFooter("Flames");
            msg.channel.send(embed);
            }
        } else msg.reply("You are already a member of the Beta Program!");
        get_userdata.writeById(msg.member.id, data);
    }
