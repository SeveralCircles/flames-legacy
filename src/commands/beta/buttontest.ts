import Discord = require("discord.js");
import buttons = require("discord-buttons");

export async function run(msg: Discord.Message, client: Discord.Client) {
    let button1 = new buttons.MessageButton()
    .setLabel("Test Button 1")
    .setStyle("blurple")
    .setID("test1");
    let row = new buttons.MessageActionRow()
    .addComponent(button1);
    let m = await msg.channel.send("Hi", { components: [ row ] });
    const filter = (button) => button.clicker.user.id === msg.author.id;
    const collector = m.createButtonCollector(filter, { time: 10000 }); //collector for 5 seconds

    collector.on('collect', b => {msg.reply("Button go brrr")});
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
}