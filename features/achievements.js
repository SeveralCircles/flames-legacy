const get_userdata = require("../data/get_userdata");
const rank = require("./rank");
const Discord = require("discord.js");
function addDefaultInfo(embed, msg) {
    embed.setAuthor("Achievement Completed!", msg.member.user.displayAvatarURL())
    embed.setTitle("Congratulations, " + msg.member.displayName + "!")
    embed.setDescription("You completed an achievement!")
    embed.setColor(0x00BFFF)
    embed.setFooter("Flames");
    embed.setTimestamp();
}
const allAchievementsCount = 1;
module.exports = {
    checkAchievements: async function(msg, data) {
        //Requires a message so that the user can be congratulated if they reach an achievement.
        // var data = get_userdata.byId(msg.member.id);
        if (data.achievements == undefined) {
            console.log("is undefined")
            data.achievements = []
        }
        //X Rank Achievement
        if (data.score >= rank.thresholds[6]) {
            if (!data.achievements.includes("Xrank")) {
                data.achievements.push("Xrank");
                let embed = new Discord.MessageEmbed();
                addDefaultInfo(embed, msg);
                embed.addField("Achievement", "Top of the World", true)
                embed.addField("Description", "Achieve X Rank by being in the top 5% of users.", true)
                embed.addField("Reward", "1000 Flames Points", true)
                embed.addField("Progress", data.achievements.length + "/" + allAchievementsCount + " (" + (data.achievements.length / allAchievementsCount) * 100 + "%)")
                msg.channel.send(embed)
                data.score = data.score + 1000;
            }
        }
        console.log(data);
        // await get_userdata.writeById(msg.member.id, data);
        return data;
        console.log(data == get_userdata.byId(msg.member.id));
    }
}