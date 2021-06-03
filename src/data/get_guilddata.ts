import fs = require('fs')
export const defaults = require("./guilddefault.json")
export function byId(id) {
        try {
            var raw = fs.readFileSync("./data/guild/" + id + ".json")
        } catch (e) {
            console.log(e);
            return defaults;    
        }
        let json = JSON.parse(raw.toString()); 
        return json;
    }
    export function writeById(id, json) {
        fs.writeFileSync("./guild" + id + ".json", JSON.stringify(json));
    }