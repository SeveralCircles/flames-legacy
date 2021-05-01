const { SlashCommand} = require('slash-create');
const bot = require('../bot.js');
const { client } = require('../bot.js');
const { DiscordAPIError } = require('discord.js');
const basedArray = ['b', 'a', 's', 'e','d']
module.exports = class FireCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'based',
      description: 'based.',
      // options: [{
      //     type: CommandOptionType.STRING,
      //     name: 'name',
      //     description: 'Your new nickname'
      // }]
    });
    this.filePath = __filename;
    // this.client = client;
  }

  async run(ctx) {
    try {
    // ctx.defer();
    // this code doesn't fucking work
    var basedName = ctx.user.username.split("");
    console.log(basedName);
    for (let i = 0; i <=4; i++) {
      basedName[i] = basedArray[i];
    }
    basedName = basedName.join("");
    // console.log(basedName);
    // var length = basedName.length/2;
    // console.log(length);
    // if (length >= basedArray.length) {
    //   for (i = length; length >= 0; i--) {
    //     basedName[i] = basedArray[i];
    //     console.log(i + " " + basedName)
    //   }
    //   basedName = basedName.join("");
    // } else {
    //   basedName = "based" + ctx.user.username;
    //   console.log(basedName);
    // }
    
    console.log(basedName);
    ctx.send(ctx.user.username + "? More like " + basedName)
    // console.log(this.client.guilds.fetch(ctx.guildID).members);
    // this.client.guilds.fetch(ctx.guildID).members.forEach(member => console.log(member.user.username)); 
    // console.log(index.getMember(ctx.guildID, ctx.user.id, this.client))
    // console.log(bot.getMember(ctx.guildID, ctx.user.id))
    // bot.getMember(ctx.guildID, ctx.user.id).nickname = basedName;
    // console.log(client.fetchMember(ctx.id));
    // ctx.editOriginal("✅ Nickname chaged.")
  } catch (e) {
    console.log(e)
  }
  }
}