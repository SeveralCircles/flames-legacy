import commando = require('discord.js-commando');
import Discord = require('discord.js');
import get_userdata = require("../../data/get_userdata")
var random = Math.random();
import info = require ("../../features/info");
export async function run(msg: Discord.Message, client: Discord.Client) {
        let data = get_userdata.byId(msg.member.id);
        if (!data.betaTester) {
            msg.reply("you must become a member of the Flames Beta Program before you can use Flames. For more information, run the \\enroll command.")
            return;
        } ;;
        let message = await msg.channel.send(info.wait(msg.member, client, "Reset User Data"))
        // console.log(args)
        if (!msg.content.includes("burnitdown")) {
            random = Math.random();
            let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor("Warning", msg.member.user.displayAvatarURL())
            .setTitle(msg.member.displayName + ", are you sure?")
            .setDescription("**THIS CANNOT BE UNDONE!**")
            .addField("This will irreversably delete the following data:", "Your Flames Score, your first seen at server, your sentiment data, and any clearances you posses.")
            .addField("Required GP", "100")
            .addField("If you still wish to reset your data, please type \\userdatareset burnitdown", "Once again, this cannot be undone!")
            .setTimestamp()
            .setFooter("Flames @ " + msg.guild.nameAcronym, client.user.displayAvatarURL());
            message.edit(embed);
        } else {
            let defaults = get_userdata.defaults;
            defaults.firstSeen = msg.guild.id;
            if (get_userdata.byId(msg.member.id).gamerpoints < 100) {
                await message.edit(info.notEnoughGP(msg.member, client, "Reset User Data", 100));
                return;
            }
            get_userdata.writeById(msg.member.id, defaults);
            let embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Operation Completed", msg.member.user.displayAvatarURL())
            .setTitle(msg.member.displayName + ", your data has been reset successfully.")
            .setDescription("Thank you for using Flames.")
            .setTimestamp()
            .setFooter("Flames @ " + msg.guild.nameAcronym, client.user.displayAvatarURL());
            message.edit(embed);
        }
    }