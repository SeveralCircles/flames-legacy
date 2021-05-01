const fs = require('fs')
const defaults = require("./hybriddefault.json")
module.exports = {
    byId: function(guildID, memberID) {
        try {
            var raw = fs.readFileSync(id + ".json")
        } catch (e) {
            let data = JSON.stringify(defaults);
            fs.writeFileSync("./data/" + guildID + "from" + memberID + ".json", data);
            return defaults;
        }
        let json = JSON.parse(raw); 
        return json;
    },
    writeById: function(guildID, memberID, json) {
        fs.writeFileSync("./data/" + guildID + "from" + memberID + ".json", JSON.stringify(json));
    },
    defaults: defaults
}