import Discord = require("discord.js");
import get_userdata = require("../../data/get_userdata");
import get_guilddata = require("../../data/get_guilddata");
export async function run(msg: Discord.Message, client: Discord.Client) {
    let data = get_userdata.byId(msg.member.id);
    let gdata = get_guilddata.byId(msg.guild.id);
    let embed = new Discord.MessageEmbed()
    .setAuthor("Flames User Data", msg.author.displayAvatarURL())
    .setTitle(msg.member.displayName + ", " + msg.guild.name + " is about to be set as your favorite server.")
    .setDescription("To cancel, react 🔴. Continuing automatically in 5 seconds.")
    .setTimestamp()
    .setColor("YELLOW")
    .setFooter("Flames @ " + msg.guild.nameAcronym, client.user.displayAvatarURL());
    let message: Discord.Message = await msg.channel.send(embed);
    message.react('🔴');
    message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '🔴'),
        { max: 1, time: 5000 }).then(collected => {
        if (collected.first().emoji.name == '🔴') {
        message.edit("Cancelled.");
        }
    }).catch(() => {
        if (data.favoriteGuild != null) {
            let oldg = get_guilddata.byId(data.favoriteGuild);
            oldg.favorites -= 1;
            get_guilddata.writeById(data.favoriteGuild, oldg);
        }
        data.favoriteGuild = msg.guild.id;
        gdata.favorites += 1;
        message.edit("Favorite Server sucessfully updated.");
        get_userdata.writeById(msg.member.id, data);
        get_guilddata.writeById(msg.guild.id, gdata);
})}
