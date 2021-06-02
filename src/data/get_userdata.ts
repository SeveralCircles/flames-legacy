import fs = require('fs')
export const defaults = require("./userdefault.json")
export var ulist = null;
export function byId(id) {
        try {
            // console.log(id)
            ulist = JSON.parse(fs.readFileSync("./ulist.json").toString())
            if (!ulist.ulist.includes(id)) ulist.ulist.push(id);
            var raw = fs.readFileSync("./data" + id + ".json")
            // console.log(raw)
        } catch (e) {
            console.log(e)
            let data = JSON.stringify(defaults);
            fs.writeFileSync("./data" + id + ".json", data);
            return defaults;
        }
        fs.writeFileSync("./ulist.json", JSON.stringify(ulist));
        let json = JSON.parse(raw.toString()); 
        return json;
    }
export async function writeById(id, json) {
        fs.writeFileSync("./" + id + ".json", JSON.stringify(json));
}