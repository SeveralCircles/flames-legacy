const Discord = require("discord.js-commando")
const client = new Discord.Client()
const msgEvent = require("./events/message");
const get_hybriddata = require("./data/get_hybriddata");
const guildCreate = require("./events/guildcreate")
module.exports = {
    login: function() {
        client.login('ODM1OTc3ODQ3NTk5NjYxMDY3.YIXTCg.RfykVPKr6RY56LFQTSzaoJRnsUo');
    },
    client: client,
    // getMember: function(guildID, memberID) {
        // return client.users.resolveID(memberID).
    // }
}
const path = require('path');

client.registry
    // Registers your custom command groups
    .registerGroups([
        ['info', "Information"],
    ])

    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));
client.commandPrefix = "\\";
client.on("message", msg => {msgEvent.onMessage(msg)});
client.on('guildCreate', guild => {guildCreate.onGuildCreate(guild)});