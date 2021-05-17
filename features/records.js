const get_globaldata = require("../data/get_globaldata");
const Discord = require("discord.js");
module.exports = {
    checkRecords(userdata) {
        let records = get_globaldata.getRecordValues();
        let recordsSet = []
        if (userdata.score > records.score) {
            recordsSet.push("score")
        }
        return recordsSet;
    },
    newRecordEmbed(record, oldrecord, newrecord, member) {
        let embed = new Discord.MessageEmbed
        .setAuthor("New Record", member.user.displayAvatarURL())
        .setTitle(member.displayName + ", you're incredible!")
        .setDescription("You set a new record!")
        .addField("Record", record)
        .addField("Old Record", oldrecord, true)
        .addField("->", "->", true)
        .addField("New Record", newrecord, true)
        .addField("Cooldown", "You can set this record again in 24 hours.")
        .addTimestamp()
        .addFooter("Nice Job! | Flames");
        return embed;
    }
}