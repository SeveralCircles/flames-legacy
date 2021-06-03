export var scores = [];
export var thresholds = [0, 1, 2, 4, 5, 6]
const ulist = require("../data/user/ulist.json")
import get_userdata = require("../data/get_userdata")
export async function syncScores() {
        scores = [];
        ulist.ulist.forEach(i=>{
            scores.push(get_userdata.byId(i).score);
        });
    }
export function syncThresholds() {
        let length = scores.length
        thresholds[0] = scores[Math.round(0.3 * (length - 1))]
        thresholds[1] = scores[Math.round(0.4 * (length - 1))]
        thresholds[2] = scores[Math.round(0.5 * (length - 1))]
        thresholds[3] = scores[Math.round(0.6 * (length - 1))]
        thresholds[4] = scores[Math.round(0.7 * (length - 1))]
        thresholds[5] = scores[Math.round(0.8 * (length - 1))]
        thresholds[6] = scores[Math.round(0.9 * (length - 1))]
    }
export function sync() {
        console.log("Updating ranking information...")
        this.syncScores();
        scores.sort(function(a, b){return a-b});
        // console.log(scores);
        this.syncThresholds();
        console.log("Ranking information updated.")
    }
export function toNext(score) {
        let rank = this.getRank(score);
        if (rank === "X") return 0;
        else if (rank === "S") return thresholds[6]-score;
        else if (rank === "A") return thresholds[5]-score;
        else if (rank === "B") return thresholds[4]-score;
        else if (rank === "C") return thresholds[3]-score;
        else if (rank === "D") return thresholds[2]-score;
        else if (rank === "F") return thresholds[1]-score;
        else return thresholds[0]-score;
    }
export function getRank(score) {
        // this.sync();
        if (thresholds.includes(score)) score++;
        // console.log(score);
        // console.log(score > thresholds[6]);
            if (score != null){
                // console.log("i don't fucking get it");
                
            }
            if (score < thresholds[0]){
                // console.log("Unranked");
                return "Unranked";
                
            }
            if (score > thresholds[0] && score < thresholds[1]){
                // console.log("F");
                return "F";
                
            }
            if (score > thresholds[1] && score < thresholds[2]){
                // console.log("D"); 
                return "D";
                
            }
            if (score > thresholds[2] && score < thresholds[3]){
                // console.log("C"); 
                return "C";
                
            }
            if (score > thresholds[3] && score < thresholds[4]){
                // console.log("B"); 
                return "B";
                
            }
            if (score > thresholds[4] && score < thresholds[5]){
                // console.log("A"); 
                return "A";
                
            }
            if (score > thresholds[5] && score < thresholds[6]){
                // console.log("S"); 
                return "S";
            
            }
            if (score > thresholds[6]){
                // console.log("X"); 
                return "X";
                
            } else{ 
                // console.log('fuck');
                return "Unranked";
                
            }
        
        }
