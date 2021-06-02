console.log("Starting Flames...");
console.log("Preparing...")
import bot = require("./bot");
import rank = require("./features/rank");
import schedule = require("node-schedule");

console.log("Updating ranking information");
rank.sync();

console.log("Scheduling tasks...")
export const updateJob = schedule.scheduleJob('0 * * * *', function() {rank.sync()}); // Also schedule a job to update rank information every hour.
export const newDay = schedule.scheduleJob('0 * * *', function(){console.log("It's a brand new day, let's make the most of it!")}); // Just for fun
console.log("Logging in...")
bot.login();
console.log("Logged in.");