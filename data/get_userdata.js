const fs = require('fs')
const defaults = require("./userdefault.json")
var ulist = null;
module.exports = {
    byId: function(id) {
        try {
            console.log(id)
            ulist = JSON.parse(fs.readFileSync("./data/ulist.json"))
            if (!ulist.ulist.includes(id)) ulist.ulist.push(id);
            var raw = fs.readFileSync("./data/" + id + ".json")
            console.log(raw)
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
    writeById: function(id, json) {
        fs.writeFileSync("./data/" + id + ".json", JSON.stringify(json));
    },
    defaults: defaults
}