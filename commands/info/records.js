// const commando = require('discord.js-commando');
// const Discord = require('discord.js');
// const get_userdata = require("../../data/get_userdata")
// const get_guilddata = require("../../data/get_guilddata")
// const rank = require("../../features/rank")
// const info = require ("../../features/info");
// const message = require('../../events/message');
// const achievements = require("../../features/achievements")
// const get_globaldata = require ("../../data/get_globaldata")
// const analysis = require("../../features/analysis");
// module.exports = class RecordsCommand extends commando.Command {
// 	constructor(client) {
// 		super(client, {
//             name: 'record',
//             aliases: ['records'],
// 			group: 'info',
// 			memberName: 'record',
// 			description: 'Gets record information.',
//             guildOnly: true
//             });  
// }
//     async run(msg) {
//         let args = msg.content.split(" ");
//         let records = get_globaldata.getRecordValues();
//         let message = await msg.channel.send(info.wait(msg.member, this.client, "Checking Global Records Information"));
//         let embed = new Discord.MessageEmbed()
//         .setAuthor("Record Information", member.user.displayAvatarURL())
//         .setColor("BLURPLE")
//         .addTimestamp()
//         .setFooter("Flames", this.client.user.displayAvatarURL());
//         switch(args[1]) {
//             case "score" || "highscore" || "alltimescore":
//                 embed.setTitle("Highest Flames Score (All-Time)")
//                 embed.setDescription("The highest an individual user has ever gotten their flames score.")
//                 embed.addField("Current Record", records.score[0] + "FP", true)
//                 embed.addField("Set by", records.score[1], true)
//                 embed.addField("on", records.score[2], true);
//                 message.edit(embed);
//             default:
//                 embed.setTitle("Invalid Input");
//                 embed.setDescription("Please refer to the key below to ensure you typed the name of the record correctly.");
//                 embed.addField("Usage", "\\record <recordname>");
//                 embed.addField("Highest Flames Score (All-Time)", "score OR highscore OR alltimescore");
//                 message.edit(embed);
//         }
//     }
// }