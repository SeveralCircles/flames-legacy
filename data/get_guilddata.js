const fs = require('fs')
const defaults = require("./guilddefault.json")
module.exports = {
    byId: function(id) {
        try {
            var raw = fs.readFileSync("./data/" + id + "g.json")
        } catch (e) {
            console.log(e);
            return defaults;    
        }
        let json = JSON.parse(raw); 
        return json;
    },
    writeById: function(id, json) {
        fs.writeFileSync("./data/" + id + "g.json", JSON.stringify(json));
    },
    defaults: defaults
}