const get_globaldata = require("../data/get_globaldata");
var gdata = get_globaldata.getValues()
const ulist = require("../data/ulist.json");
module.exports = {
    exchangeRate: function() {
        // this.sync();
        return Math.round((gdata.score / ulist.ulist.length) / 10)
    },
    sync: function() {
        if (gdata.gamerpoints <= 100) {
            console.log("Gamer Bank running out of GP! Adding random amount");
            gdata.gamerpoints += Math.round(Math.random() * 1000);
        }
    },
    exchangePossible(fp) {
        let rate = this.exchangeRate();
        if (Math.round(fp/rate) < 1) return false;
        else return true;
    }
}