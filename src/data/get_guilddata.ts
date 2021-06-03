import fs = require('fs')
export const defaults = require("./guilddefault.json")
export function byId(id) {
    try {
        var raw = fs.readFileSync(__dirname + "\\guild\\" + id + ".json")
    } catch (e) {
        console.log(e);
        console.log("Returning guild defaults");
        return defaults;    
    }
    let json = JSON.parse(raw.toString());
    console.log("Reading data for " + id);
    return json;
}
export function writeById(id, json) {
    console.log("Writing data for " + id)
    fs.writeFileSync(__dirname + "\\guild\\" + id + ".json", JSON.stringify(json));
}