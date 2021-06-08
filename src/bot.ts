import Discord = require("discord.js-commando")
export const client = new Discord.Client()
import msgEvent = require("./events/message");
import guildCreate = require("./events/guildcreate")
import path = require('path');
import docs = require("./commands/info/docsw")
import enroll = require("./commands/beta/enroll")
import globalinfo = require("./commands/info/globalinfo")
import report = require("./commands/beta/report")
import resetuserinfo = require("./commands/data/resetuserinfo")
import upgrademuliplier = require("./commands/gp/upgrademultiplier")
import userinfo = require("./commands/data/userinfo")
import wallet = require("./commands/gp/wallet")
import gmr = require("./events/guildmemberremove");
export function login() {
        client.login('ODM1OTc3ODQ3NTk5NjYxMDY3.YIXTCg.RfykVPKr6RY56LFQTSzaoJRnsUo');
    // getMember: function(guildID, memberID) {
        // return client.users.resolveID(memberID).
    // }
}
client.registry

    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all of your commands in the ./commands/ directory
    .registerGroups([
        ['info', "Information"],
        ['gp', "Wallet"],
        ['data', "Data"],
        ['beta', "Beta Program"]
    ])
    .registerCommandsIn(path.join(__dirname, "commands"))
    // .registerCommands([new docs.Docs(this), new enroll.EnrollCommand(this), new globalinfo.GlobalInfoCommand(this), new report.ReportCommand(this), new resetuserinfo.ResetUserInfoCommand(this), new upgrademuliplier.MultiplierCommand(this), new userinfo.UserInfoCommand(this), new wallet.WalletCommand(this)]);
console.log(path.join(__dirname, 'commands'));
client.commandPrefix = "\\";
client.on("message", msg => {msgEvent.onMessage(msg)});
client.on('guildCreate', guild => {guildCreate.onGuildCreate(guild)});
client.on("guildMemberRemove", member => {gmr.on(member)});