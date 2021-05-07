const Discord = require('discord.js')
module.exports = {
    wait: function(member, client, operation) {
        let embed = new Discord.MessageEmbed
        .setAuthor("Please Wait", member.user.displayAvatarURL())
        .setTitle(member.displayName + ", please wait while your request is being proccessed.")
        .setDescription("This shouldn't take too long. If it does, your request may have encountered an error.")
        .addField("Ongoing Operation", operation)
        .setFooter("Flames", client.user.displayAvatarURL());
        return embed;
    }
}