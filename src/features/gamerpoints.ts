import get_globaldata = require("../data/get_globaldata");
var gdata = get_globaldata.getValues()
const ulist = require("../data/user/ulist.json");
import Discord = require("discord.js");
    export var exchangeRate = Math.round((gdata.score / ulist.ulist.length) / 10)
    export function exchangeRateCalc() {
        gdata = get_globaldata.getValues();
        return Math.round((gdata.score / ulist.ulist.length) / 10);
    }
    export function sync() {
        if (gdata.gamerpoints <= 100) {
            console.log("Gamer Bank running out of GP! Adding random amount");
            gdata.gamerpoints += Math.round(Math.random() * 1000);
        }
    }
    export function exchangePossible(fp) {
        let rate = this.exchangeRate();
        if (Math.round(fp/rate) < 1) return false;
        else return true;
    }
    export function purchaseDialog(member, amount, item, client, data) {
            let embed = new Discord.MessageEmbed()
            .setAuthor("Purchase Confirmation", member.user.displayAvatarURL())
            .setTitle(member.displayName + ", please review the following details and confirm if you wish to proceed.")
            .addField("Item", item, true)
            .addField("Cost", amount + " GP", true)
            .addField("Starting Balance", data.gamerpoints, true)
            .addField("Ending Balance", data.gamerpoints - amount, true)
            .setFooter("Flames | Flames will never charge real money for its services. | ✅ to confirm, 🔴 to reject.", client.user.displayAvatarURL());
            return embed;
    }
    export function purchaseConfirm(member, item, client, newBalance) {
        let embed = new Discord.MessageEmbed()
            .setAuthor("Purchase Completed", member.user.displayAvatarURL())
            .setTitle(member.displayName + ", your purchase has been processed successfully.")
            .addField("Item", item, true)
            .addField("Your Balance", newBalance + " GP", true)
            .setFooter("Flames | GP exchanges are final.", client.user.displayAvatarURL());
            return embed;
    }
