import Discord = require('discord.js')
import get_userdata = require("../data/get_userdata");
    export function wait(member, client, operation) {
        let embed = new Discord.MessageEmbed()
        .setAuthor("Please Wait", member.user.displayAvatarURL())
        .setTitle(member.displayName + ", please wait while your request is being proccessed.")
        .setDescription("This shouldn't take too long. If it does, your request may have encountered an error.")
        .addField("Ongoing Operation", operation)
        .setColor("YELLOW")
        .setTimestamp()
        .setFooter("FL-00-01", client.user.displayAvatarURL());
        return embed;
    }
    export function userDataCorrupt(member, client, error) {
        let embed = new Discord.MessageEmbed()
        .setAuthor("User Data Error", member.user.displayAvatarURL())
        .setColor("RED")
        .setTitle(member.displayName + ", your User Data is corrupt or very outdated.")
        .setDescription("For more information, click the link above.")
        .addField("Tip", "You may need to reset your User Data. Run '\\resetmydata' to get started.")
        .setFooter("FL-02-01", client.user.displayAvatarURL())
        .setURL("https://aidanveney.gitbook.io/flames/troubleshooting/errors-and-informational-messages")
        .addField("Error Info", error)
        .setTimestamp();
        return embed;
    }
    export function notEnoughGP(member, client, operation, requiredGP) {
        let embed = new Discord.MessageEmbed()
        .setAuthor("Not Enough GP", member.user.displayAvatarURL())
        .setColor("RED")
        .setTitle(member.displayName + ", you do not have enough GP to complete the '" + operation + "' operation.")
        .setDescription("To learn more about GP, run \\mygp")
        .addField("Amount Required", requiredGP + " GP", true)
        .addField("Current Balence", get_userdata.byId(member.id).gamerpoints, true)
        .setFooter("FL-02-02", client.user.displayAvatarURL())
        .setTimestamp();
        return embed;
    }
    export function resetFirstSeen(member, client) {
        let embed = new Discord.MessageEmbed()
        .setTitle(member.displayName + ", Flames couldn't figure out where it first saw you, so your First Seen At has been reset to this server.")
        .setTimestamp()
        .setFooter("FL-01-01 | This message will dismiss automatically after 5 seconds.",client.user.displayAvatarURL());
        return embed;
    }
    export function resetGuildData(guild: Discord.Guild) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(guild.nameAcronym + " x Flames")
        .setColor("GREEN")
        .setTitle(guild.name + ", welcome to Flames!")
        .setDescription("Flames is now set up to run on " + guild.nameAcronym + "! No further action is required.")
        .setTimestamp()
        .setFooter("Flames  | Flames will now wait 10 seconds before continuing to prevent spam.");
        return embed;
    }
    export function welcomeToGuild(guild: Discord.Guild, member: Discord.GuildMember, gdata) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(guild.nameAcronym, member.user.displayAvatarURL())
        .setTitle("Welcome to " + guild.name)
        .setThumbnail(guild.iconURL())
        .setDescription(gdata.welcomeMessage)
        .addField("Population", guild.memberCount, true)
        .setTimestamp()
        .setFooter("Flames @ " + guild.nameAcronym);
        return embed;
    }
    export function wrongArgs(msg: Discord.Message, example: string) {
        let embed = new Discord.MessageEmbed()
        .setTitle(msg.member.displayName + ", that is not the correct way to use that command.")
        .setDescription("Example Usage: " + example)
        .setTimestamp()
        .setFooter("Flames @ " + msg.guild.nameAcronym);
        return embed;
    }