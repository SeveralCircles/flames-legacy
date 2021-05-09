const fs = require('fs')
const defaults = require("./globaldefault.json")
var ulist = null;
module.exports = {
    getValues: function() {
        try {
            // console.log(id)
            var raw = fs.readFileSync("./data/" + "global" + ".json")
            // console.log(raw)
        } catch (e) {
            console.log("File not found or invalid (global.json), writing defaults.")
            let data = JSON.stringify(defaults);
            fs.writeFileSync("./data/" + "global" + ".json", data);
            return defaults;
        }
        let json = JSON.parse(raw); 
        return json;
    },
    writeValues: function(json) {
        fs.writeFileSync("./data/" + "global" + ".json", JSON.stringify(json));
    },
    defaults: defaults
}