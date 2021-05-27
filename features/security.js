import { DiscordAPIError, User } from "discord.js";

/* 
-- Flames Security --
This module is responsible for most security-related functions of Flames.

This module is implemented in Spark 4 and later. User Data files from Spark 3 and earlier must be updated using FS or they will not work with Flames. Invalid fsIDs will be disabled.
*/
const get_userdata = require("../data/get_userdata");
const Discord = require("discord.js");
module.exports = {
    check_fsID: function(fsID, userID) {
        if (fsID == undefined) return undefined;
        let uid = Number.parseInt(userID);
        return (fsID * 324856) == userID;
    },
    disabled: function(json) {
        if (!json.disabled) return false;
        else {
            let date = new Date();
            if (json.disabledUntil.getMilliseconds < date.getMilliseconds() || json.disabledUntil == 0) return true;
            else return false;
        }
    },
    disable(user, until, reason) {
        let date = new Date();
        let data = await get_userdata.byId(user.id);
        data.disabled = true;
        if (until == 0) date.disabledUntil == 0;
        else data.disabledUntil = until.getMilliseconds();
        data.reason = reason;
        let embed = new Discord.MessageEmbed()
        .setAuthor("Flames Security", user.displayAvatarURL())
        .setTitle("User Suspension Notice")
        .setDescription("To protect Flames and its users, Flames Security has disabled Flames' functions. More information can be found below.")
        .addField("User", user.username, true)
        .addField("Reason", reason, true)
        .setColor("RED");
        if (until == 0) {
            // Permanent
            embed.addField("Permanent", "The suspension is set to never expire.");
            embed.setTimestamp();
            embed.setFooter("Flames");
        } else {
            // Temporary
            embed.setTimestamp(until);
            embed.setFooter("Flames | Expires")
        }
        user.send(embed);
        
    },
    warning: function(user, message) {
        let embed =  new Discord.MessageEmbed()
        .setAuthor("Flames Security", user.displayAvatarURL())
        .setTitle(user.username + ", stop!")
        .setDescription("Flames Security may disable Flames' functions if you continue. More information can be found below.")
        .addField("Message", message, true)
        .setColor("YELLOW")
        .setTimestamp()
        .setFooter("Flames");
        user.send(embed);
    },
    runTrigger(user, trigger) {
        let data = await get_userdata.byId(user.id);
        switch(trigger) {
            case "chaostheory":
                this.warning(user, "Do not mention the forbidden topic.");
                data.riskReason = "Mentioned the forbidden topic";
                data.riskScore += 25;
                data.score -= 1000;
        }
        await get_userdata.writeById(user.id, data);
    },
    checkScore(user) {
        let data = await get_userdata.byId(user.id);
        let date = new Date();
        let until = new Date()
        .setDate(date.getDate + 1);
        if (data.riskScore >= 100) {
            this.disable(user, until, data.riskReason);
        }
    }
}