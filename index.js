const { SlashCreator, GatewayServer} = require('slash-create');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
const creator = new SlashCreator({
  applicationID: '835977847599661067',
  publicKey: '37c20b075723c8360182252cdf62268628b7b9970235998ab8615c0c18dab5d2',
  token: 'ODM1OTc3ODQ3NTk5NjYxMDY3.YIXTCg.RfykVPKr6RY56LFQTSzaoJRnsUo',
});
const bot = require("./bot")
const rank = require("./features/rank")
rank.sync();
bot.login();
try {
creator
  .withServer(
    new GatewayServer(
      (handler) => bot.client.ws.on('INTERACTION_CREATE', handler)
    )
  );
} catch (e) {
  console.log(e);
}
  const path = require('path');
  // const HelloCommand = require('./commands/hello');
  const FireCommand = require('./commands/fire');

  try {
    creator
      // Registers all of your commands in the ./commands/ directory
      // .registerCommandsIn(path.join(__dirname, 'commands'))
      // This will sync commands to Discord, it must be called after commands are loaded.
      // This also returns itself for more chaining capabilities.
      // .registerCommand(new HelloCommand(client, creator))
      // .registerCommand(new FireCommand(client, creator))
      .registerCommand(new FireCommand(creator))
      .syncCommands();
  } catch (e) {
    console.log(e);
  }
console.log("Logged in.");
