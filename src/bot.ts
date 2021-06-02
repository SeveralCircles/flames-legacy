import Discord = require("discord.js-commando")
export const client = new Discord.Client()
import msgEvent = require("./events/message");
import guildCreate = require("./events/guildcreate")
export function login() {
        client.login('ODQ5MzIwMjU5MTUyMTE3ODgy.YLZdIQ.keIWGep6_IjSQvbD4NMXQXwKYl4');
    }
    // getMember: function(guildID, memberID) {
        // return client.users.resolveID(memberID).
    // }
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