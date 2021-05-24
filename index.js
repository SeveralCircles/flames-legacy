console.log("Starting Flames...");
console.log("Preparing...")
const bot = require("./bot");
const rank = require("./features/rank");
console.log("Updating ranking information");
rank.sync();
console.log("Logging in...")
bot.login();
console.log("Logged in.");
