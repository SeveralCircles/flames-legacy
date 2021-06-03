import fs = require('fs')
export const defaults = require(".\\userdefault.json")
export var ulist = null;
export function byId(id) {
        try {
            // console.log(id)
            ulist = JSON.parse(fs.readFileSync(__dirname + "\\user\\ulist.json").toString())
            if (!ulist.ulist.includes(id)) ulist.ulist.push(id);
            var raw = fs.readFileSync(__dirname + "\\user\\" + id + ".json")
            // console.log(raw)
        } catch (e) {
            console.log(e)
            let data = JSON.stringify(defaults);
            fs.writeFileSync(__dirname + "\\user\\" + id + ".json", data);
            return defaults;
        }
        fs.writeFileSync(__dirname + "\\user\\ulist.json", JSON.stringify(ulist));
        let json = JSON.parse(raw.toString()); 
        return json;
    }
export async function writeById(id, json) {
        fs.writeFileSync(__dirname + "\\user\\" + id + ".json", JSON.stringify(json));
}