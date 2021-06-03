import Discord = require("discord.js");
import get_guilddata = require("../../data/get_guilddata");
export async function run(msg: Discord.Message, client: Discord.Client) {
    let gdata = await get_guilddata.byId(msg.guild.id);
    let embed = new Discord.MessageEmbed()
    .setAuthor("Guild Data", msg.author.displayAvatarURL())
    .setTitle(msg.guild.name)
    .setDescription("Server Since " + msg.guild.createdAt.toLocaleDateString())
    .addField("Favorites ", gdata.favorites, true)
    .setThumbnail(msg.guild.iconURL())
    .setFooter("Flames @ " + msg.guild.nameAcronym, client.user.displayAvatarURL());
    msg.channel.send(embed);
}