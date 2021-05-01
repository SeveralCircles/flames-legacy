const Discord = require('discord.js');
const get_userdata = require('../data/get_userdata');
const get_hybriddata = require('../data/get_hybriddata');
const { json } = require('body-parser');
const analysis = require("../features/analysis")
module.exports = {
    onMessage: async function(msg) {
        try {
        let userdata = null;
        let anal = await analysis.analysis(msg.content);
        userdata = get_userdata.byId(msg.member.id);
        if (userdata == get_userdata.defaults) userdata.firstSeen = msg.guild.id;
        // let hybriddata = get_hybriddata.byId(msg.guild.id, msg.member.id);
        // if (hybriddata.member == null) hybriddata.member = msg.member;
        userdata.score = userdata.score + anal;
        try {
        userdata.averageSentiment.push(anal);
        } catch (e) {
            userdata.averageSentiment = []
        }
        // get_hybriddata.writeById(msg.guild.id, msg.member.id, hybriddata);
        // console.log("(userdata.averageSentiment.reduce((a, b) => a + b, 0)) / userdata.averageSentiment.length");
        if ((userdata.averageSentiment.reduce((a, b) => a + b, 0)) / userdata.averageSentiment.length <= -1.0) {
            let embed = new Discord.MessageEmbed()
            .setAuthor("Vibe Check", msg.member.user.displayAvatarURL())
            .setTitle(msg.member.displayName + ", you do not pass the vibe check.")
            .setDescription("You're average emotion is far too low. Would it kill you to be more positive?")
            .setFooter("Flames");
            msg.channel.send(embed);
        }
        get_userdata.writeById(msg.member.id, userdata);
        } catch (e) {console.log(e)};
        
    }
}