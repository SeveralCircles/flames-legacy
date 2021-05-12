const fs = require('fs')
const defaults = require("./userdefault.json")
var ulist = null;
const currentVersion = 1;
module.exports = {
    byId: function(id) {
        try {
            // console.log(id)
            ulist = JSON.parse(fs.readFileSync("./data/ulist.json"))
            if (!ulist.ulist.includes(id)) ulist.ulist.push(id);
            var raw = fs.readFileSync("./data/" + id + ".json")
            // console.log(raw)
        } catch (e) {
            console.log(e)
            let data = JSON.stringify(defaults);
            fs.writeFileSync("./data/" + id + ".json", data);
            return defaults;
        }
        fs.writeFileSync("./data/ulist.json", JSON.stringify(ulist));
        let json = JSON.parse(raw); 
        return json;
    },
    writeById: async function(id, json) {
        fs.writeFileSync("./data/" + id + ".json", JSON.stringify(json));
    },
    defaults: defaults,
    update: async function(id, json) {
        let data2 = null;
        if (this.byId(id).version < 1 || this.byId(id).version == null) {
            data2 = this.defaults;
            data2.firstSeen = json.firstSeen;
            data2.verified = json.verified;
            data2.score = json.score;
            data2.averageSentiment = json.averageSentiment;
            data2.streak = 0;
            data2.lastStreak = -2;
            data2.version = 1;
        } else (data2 = json)
        this.writeById(id, data2);
    }
}