console.log("Starting Flames...");

console.log("Preparing...")
const bot = require("./bot");
const rank = require("./features/rank");
const schedule = require("node-schedule");

console.log("Updating ranking information");
rank.sync();

console.log("Scheduling tasks...")
const updateJob = schedule.scheduleJob('0 * * * *', function() {rank.sync()}); // Also schedule a job to update rank information every hour.
const newDay = schedule.scheduleJob('0 * * *', function(){console.log("It's a brand new day, let's make the most of it!")}); // Just for fun
console.log("Logging in...")
bot.login();
console.log("Logged in.");
module.exports = {
  updateJob: updateJob,
  newDay: newDay,
}