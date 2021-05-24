const Discord = require('discord.js');
const get_userdata = require('../data/get_userdata');
const analysis = require("../features/analysis")
const get_globaldata = require("../data/get_globaldata")
const achievements = require("../features/achievements")
const records = require("../features/records");
const util = require("../features/util")
module.exports = {
    onMessage: async function(msg) {
        if (msg.member.id === "835977847599661067") return;
        if (msg.content.startsWith("\\")) return;
        // if (!severalcircles.getData("/test/test.json") == successjson) console.log("god fucking damnit");
        // if (msg.content.toLowerCase().includes("sam")) achievements.samAchievement(msg, userdata);
        let globaldata = get_globaldata.getValues();
        let recordValues = get_globaldata.getRecordValues();
        let date = new Date();
        try {
        let userdata = null;
        let anal = await analysis.analyzeSentiment(msg.content);
        userdata = get_userdata.byId(msg.member.id);
        records.checkRecords(userdata).forEach(value => {
            switch (value) {
                case "score":
                    if (userdata.scoreRecordCooldown > date.getMilliseconds) return;
                    msg.channel.send(records.newRecordEmbed("Highest Flames Score (All Time)", recordValues.score, userdata.score, msg.member));
                    userdata.scoreRecordCooldown = date.getMilliseconds() + 86400000;
                    recordValues.score = [userdata.score, msg.member.displayName, date.toDateString()];
                    if(!userdata.records.includes("score")) userdata.records.push("score");
                    break;
            }
        });
        if (userdata == get_userdata.defaults) userdata.firstSeen = msg.guild.id;
        // let hybriddata = get_hybriddata.byId(msg.guild.id, msg.member.id);
        // if (hybriddata.member == null) hybriddata.member = msg.member;
        if (userdata.multiplier == undefined) userdata.multiplier = 1.0;
        sc = Math.round((anal * userdata.multiplier));
        if (date.getDay() == 5) sc = sc * 2
        userdata.score += sc;
        globaldata.score = globaldata.score + anal;
        let date = new Date()
        let day = await date.getDay();
        // Reset daily change if the last time the file was updated wasn't today.
        if (globaldata.lastDate != day) globaldata.dailyChange = 0;
        globaldata.dailyChange = globaldata.dailyChange + anal;
        globaldata.lastDate = day;
        try {
        userdata.averageSentiment.push(anal);
        } catch (e) {
            userdata.averageSentiment = []
        }
        userdata.entities = await analysis.analyzeEntities(msg.content, userdata);
        // get_hybriddata.writeById(msg.guild.id, msg.member.id, hybriddata);
        // console.log("(userdata.averageSentiment.reduce((a, b) => a + b, 0)) / userdata.averageSentiment.length");
        if ((userdata.averageSentiment.reduce((a, b) => a + b, 0)) / userdata.averageSentiment.length <= -500.0) {
            let embed = new Discord.MessageEmbed()
            .setAuthor("Vibe Check", msg.member.user.displayAvatarURL())
            .setTitle(msg.member.displayName + ", you do not pass the vibe check.")
            .setDescription("You're average emotion is far too low. Would it kill you to be more positive?")
            .setFooter("Flames");
            msg.channel.send(embed);
        }
        userdata = await achievements.checkAchievements(msg, userdata);
        if (msg.content.toLowerCase().includes("sam")) userdata = await achievements.samAchievement(msg, userdata);
        if (userdata.averageSentiment.length % 1000 == 0) userdata.multiplier += 0.01
        if (userdata.lastSeen < 0) userdata.lastSeen = date.getDay();
        if (userdata.lastSeen < date.getDay()) {
            if (userdata.lastSeen == date.getDay() - 1 || (userdata.lastSeen == 6 && date.getDay() == 0)) {
                userdata.streak++;
            }
            let dailyBonus = 1000 + (100 * userdata.streak);
            userdata.score += dailyBonus;
            let embed = new Discord.MessageEmbed()
            .setAuthor("Hi, " + msg.member.user.username ,msg.member.user.displayAvatarURL())
            .setTitle("Welcome Back to Flames")
            .setDescription(util.getDailyMessage(userdata, msg.author.username))
            .addField("Daily Bonus", dailyBonus + " FP", true)
            .addField("Your Flames Score", userdata.score + " FP",  true)
            .setTimestamp()
            .setFooter("Have a great rest of your day! | Flames");
            msg.author.send(embed);
        }
        await get_userdata.writeById(msg.member.id, userdata);
        console.log(globaldata);
        get_globaldata.writeValues(globaldata);
        } catch (e) {console.log(e)};
        
    }
}