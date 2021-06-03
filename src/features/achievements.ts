import rank = require("./rank");
import Discord = require("discord.js");
function addDefaultInfo(embed, msg) {
    embed.setAuthor("Achievement Completed!", msg.member.user.displayAvatarURL())
    embed.setTitle("Congratulations, " + msg.member.displayName + "!")
    embed.setDescription("You completed an achievement!")
    embed.setColor(0x00BFFF)
    embed.setFooter("Flames");
    embed.setTimestamp();
}
export const allAchievementsCount = 3;
export async function samAchievement(msg, data) {
    console.log("data into sam: " + JSON.stringify(data));
    if (data.achievements.includes("sam")) return data;
    let embed = new Discord.MessageEmbed();
    data = await this.checkAchievements(msg, data);
    addDefaultInfo(embed, msg);
    embed.addField("Achievement", "Sam", true);
    embed.addField("Description", "Get Sammed", true);
    embed.addField("Reward", "300 Flames Points", true);
    embed.addField("Progress", data.achievements.length + "/" + allAchievementsCount + " (" + (data.achievements.length / allAchievementsCount) * 100 + "%)");
    data.score = data.score + 300;
    data.achievements.push("sam");
    msg.channel.send(embed);
    console.log("data out of sam:" + JSON.stringify(data))
    return data;
    }
export async function checkAchievements(msg, data) {
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

        //Owner Achievement
        if (msg.guild.owner == msg.member) {
            if (!data.achievements.includes("owner")) {
                data.achievements.push("owner");
                let embed = new Discord.MessageEmbed();
                addDefaultInfo(embed, msg);
                embed.addField("Achievment", "Let me guess, your home?", true);
                embed.addField("Description", "Become the owner of a server.", true)
                embed.addField("Reward", "1000 Flames Points", true)
                embed.addField("Progress", data.achievements.length + "/" + allAchievementsCount + " (" + (data.achievements.length / allAchievementsCount) * 100 + "%)");
                msg.channel.send(embed);
                data.score = data.score + 1000;
            }
        }
        console.log(data);
        // await get_userdata.writeById(msg.member.id, data);
        return data;
        // console.log(data == get_userdata.byId(msg.member.id));
    }
