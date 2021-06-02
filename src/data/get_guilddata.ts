import fs = require('fs')
export const defaults = require("./guilddefault.json")
export function byId(id) {
        try {
            var raw = fs.readFileSync("./" + id + "g.json")
        } catch (e) {
            console.log(e);
            return defaults;    
        }
        let json = JSON.parse(raw.toString()); 
        return json;
    }
    export function writeById(id, json) {
        fs.writeFileSync("./" + id + "g.json", JSON.stringify(json));
    }