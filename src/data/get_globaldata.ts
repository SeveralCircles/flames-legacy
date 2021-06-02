import fs = require('fs')
export const defaults = require("./globaldefault.json")
// const recorddefaults = require("./recordsdefault.json")
// var ulist = null;
export function getValues() {
        try {
            // console.log(id)
            var raw = fs.readFileSync("./" + "global" + ".json")
            // console.log(raw)
        } catch (e) {
            console.log("File not found or invalid (global.json), writing defaults.")
            let data = JSON.stringify(defaults);
            fs.writeFileSync("./" + "global" + ".json", data);
            return defaults;
        }
        let json = JSON.parse(raw.toString()); 
        return json;
    }
export function writeValues(json) {
        fs.writeFileSync("./" + "global" + ".json", JSON.stringify(json));
    }
    // getRecordValues: function() {
    //     try {
    //         // console.log(id)
    //         var raw = fs.readFileSync("./data/" + "global" + ".json")
    //         // console.log(raw)
    //     } catch (e) {
    //         console.log("File not found or invalid (records.json), writing defaults.")
    //         let data = JSON.stringify(recorddefaults);
    //         fs.writeFileSync("./data/" + "records" + ".json", data);
    //         return defaults;
    //     }
    //     let json = JSON.parse(raw); 
    //     return json;
    // },
    // writeRecordValues: function(json) {
    //     fs.writeFileSync("./data/" + "records" + ".json", JSON.stringify(json));
    // },
    // recorddefaults: recorddefaults
