import commando = require('discord.js-commando');
import Discord = require('discord.js');
export async function run(msg, args, client) {
    let embed = new Discord.MessageEmbed()
    .setAuthor("Flames Documentation", msg.member.user.displayAvatarURL())
    .setTitle(msg.member.displayName + ", click here to see the documentation.")
    .setDescription("Opens in your browser.")
    .setURL("https://docs.severalcircles.com")
    .setFooter("Flames", client.user.displayAvatarURL());
    return await msg.channel.send(embed);
}
