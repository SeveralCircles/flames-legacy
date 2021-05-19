const Discord = require('discord.js')
const get_userdata = require("../data/get_userdata");
module.exports = {
    wait: function(member, client, operation) {
        let embed = new Discord.MessageEmbed()
        .setAuthor("Please Wait", member.user.displayAvatarURL())
        .setTitle(member.displayName + ", please wait while your request is being proccessed.")
        .setDescription("This shouldn't take too long. If it does, your request may have encountered an error.")
        .addField("Ongoing Operation", operation)
        .setColor("YELLOW")
        .setTimestamp()
        .setFooter("FL-00-01", client.user.displayAvatarURL());
        return embed;
    },
    userDataCorrupt: function(member, client, error) {
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
    },
    notEnoughGP: function(member, client, operation, requiredGP) {
        let embed = new Discord.MessageEmbed()
        .setAuthor("Not Enough GP", member.user.displayAvatarURL())
        .setColor("RED")
        .setTitle(member.displayName + ", you do not have enough GP to complete the '" + operation + ' operation.')
        .setDescription("To learn more about GP, run \\mygp")
        .addField("Amount Required", requiredGP + " GP", true)
        .addField("Current Balence", get_userdata.byId(member.id).gamerpoints, true)
        .setFooter("FL-02-02", client.user.displayAvatarURL())
        .setTimestamp();
        return embed;
    }
}