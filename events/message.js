const Discord = require('discord.js');
const get_userdata = require('../data/get_userdata');
const analysis = require("../features/analysis")
const get_globaldata = require("../data/get_globaldata")
const achievements = require("../features/achievements")
const util = require("../features/util")
module.exports = {
    onMessage: async function(msg) {
        // If message is from Flames or is a command, don't process it.
        if (msg.member.id === "835977847599661067") return;
        if (msg.content.startsWith("\\")) return;

        // Load global data
        let globaldata = get_globaldata.getValues();
        
        //Date object used for various things in this script
        let date = new Date();

        // This script is prone to errors, and since node doesn't like to print out errors unless you try/catch it, we just surround most of it in one big try/catch.
        try {
        // Prepare userdata object
        let userdata = get_userdata.byId(msg.member.id);

        //Analyze message sentiment
        let anal = await analysis.analyzeSentiment(msg.content);

        // If we've never seen this user before, we set their first seen guild to wherever the message was sent.
        if (userdata == get_userdata.defaults) userdata.firstSeen = msg.guild.id;

        // If they haven't sent a message since Spark 2, then their userdata won't have a multiplier, so we set it to 1.0x in that case
        if (userdata.multiplier == undefined) userdata.multiplier = 1.0;
        
        // Calculate the message score using the user's multiplier, and also double it if it's Double Friday
        mscore = Math.round((anal * userdata.multiplier));
        if (date.getDay() == 5) mscore = mscore * 2
        //...and then update the value in userdata
        userdata.score += mscore;
        //...and the global data.
        globaldata.score = globaldata.score + anal;

        // Reset daily change if the last time the file was updated wasn't today.
        if (globaldata.lastDate != date.getDay()) globaldata.dailyChange = 0;
        globaldata.dailyChange = globaldata.dailyChange + anal;
        globaldata.lastDate = date.getDay();

        // This adds the message score (before multipliers) to your average array. If the user hasn't sent a message since pre-Spark 1 (somehow), they will need to reset their userdata.
        userdata.averageSentiment.push(anal);

        // Add any entities detected in the message to the 
        userdata.entities = await analysis.analyzeEntities(msg.content, userdata);

        // Vibe check! If a user is being too negative, Flames yells at them (lol)
        if ((userdata.averageSentiment.reduce((a, b) => a + b, 0)) / userdata.averageSentiment.length <= -100.0) {
            let embed = new Discord.MessageEmbed()
            .setAuthor("Vibe Check", msg.member.user.displayAvatarURL())
            .setTitle(msg.member.displayName + ", you do not pass the vibe check.")
            .setDescription("You're average emotion is far too low. Would it kill you to be more positive?")
            .setFooter("Flames");
            msg.channel.send(embed);
        }

        // Checks achievements
        userdata = await achievements.checkAchievements(msg, userdata);
        if (msg.content.toLowerCase().includes("sam")) userdata = await achievements.samAchievement(msg, userdata);

        // Every 1000 messages, a little bonus gets added to the user's multiplier.
        if (userdata.averageSentiment.length % 1000 == 0) userdata.multiplier += 0.01

        // Streak check!
        // If a user hasn't ever sent a message, or hasn't sent a message since Spark 3, this will add this value to their userdata.
        if (userdata.lastSeen < date.getDay() || (userdata.lastSeen == 6 && date.getDay != 6) || userdata.lastSeen < 0 || userdata.lastSeen == undefined) { // Checks if daily greeting still needs to be sent
            if (userdata.lastSeen == date.getDay() - 1 || (userdata.lastSeen == 6 && date.getDay() == 0)) { // Checks if the user is keeping or losing their streak
                userdata.streak++; // Keep the streak
            } else userdata.streak = 1; // Lose the streak
            // Daily bonus starts at 1000 FP and goes up with each new day in the streak. There is no maximum.
            let dailyBonus = 1000 + (100 * userdata.streak);
            userdata.score += dailyBonus;
            // Send daily greeting to user
            let embed = new Discord.MessageEmbed()
            .setAuthor("Hi, " + msg.member.user.username ,msg.member.user.displayAvatarURL())
            .setTitle("Welcome Back to Flames")
            .setDescription(util.getDailyMessage(userdata, msg.author.username))
            .addField("Daily Bonus", dailyBonus + " FP", true)
            .addField("Your Flames Score", userdata.score + " FP",  true)
            .setTimestamp()
            .setFooter("Have a great rest of your day! | Flames");
            msg.author.send(embed);
            userdata.lastSeen = date.getDay();
        }

        // Write all of that data to the respective files.
        await get_userdata.writeById(msg.member.id, userdata);
        get_globaldata.writeValues(globaldata);
        } catch (e) {console.log(e)};
        
    }
}