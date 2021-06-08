import Discord = require("discord.js");
import info = require("../../features/info")
import get_guilddata = require("../../data/get_guilddata")
export async function run(msg: Discord.Message, client: Discord.Client) {
    let message = await msg.channel.send(info.wait(msg.member, client, "Guild Configuration"));
    let data = get_guilddata.byId(msg.guild.id);
    let keys = Object.keys(data);
    let args = msg.content.split(" ");
    if (args[0] != null) {
        switch(args[0]) {
            case "welcomeMessage":
                let wmessage = "";
                args.forEach(function (element, index) {
                    if (index >= 2) {
                        wmessage = wmessage + " " + element;
                    }
                    data.welcomeMessage = wmessage;
                    success(message);
                });
            case "debugEnabled":
                switch (args[2]) {
                    case "true": 
                        data.debugEnabled = true;
                        break;
                    case "false": 
                        data.debugEnabled = false
                        break;
                    default:
                        message.edit(info.wrongArgs(msg, "\\gconfig debugEnabled true"))
                        return;
                }
                success(message);
            default:
                message.edit(info.wrongArgs(msg, "\\gconfig welcomeMessage Welcome home!"));
        }
    }
    let embed = new Discord.MessageEmbed()
    .setAuthor("Flames Server Configuration", msg.author.displayAvatarURL())
    .setTitle(msg.guild.name)
    .setDescription("To change a setting, run `\\gconfig <setting name> <new value>`.")
    .addField("welcomeMessage: string", data.welcomeMessage)
    .addField("debugEnabled: boolean", data.debugEnabled)
    .setFooter("Flames @ " + msg.guild.nameAcronym);

}
function success(message: Discord.Message) {
    let embed = new Discord.MessageEmbed()
    .setTitle("Server Configuration Updated.")
    .setTimestamp()
    .setFooter("Flames @ " + message.guild.nameAcronym);
    message.edit(embed);
}