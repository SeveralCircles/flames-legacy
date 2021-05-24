const rank = require("../features/rank")
module.exports = {
    convertToNiceTime: function(days)  {
        let years = 0
        let months = 0
        let weeks = 0
        let remain = 0;
        while (days) {
            if (days >= 365) {
                years++;
                days -= 365
            } else if (days >= 30) {
                months++;
                days -=30;
            } else if (days >= 7) {
                weeks++;
                days -= 7;
            } else {
                remain++;
                days--;
            }
        }
        if (years > 0) return years + " years, " + months + " months, " + weeks + " weeks, and" + remain + " days.";
        else if (months > 0 ) return months + " months, " + weeks + " weeks, and" + remain + " days.";
        else if (weeks > 0) return weeks + " weeks and" + remain + " days.";
        else return remain + " days"
    },
    getDailyMessage: function(data, name) {
        let date = new Date();
        if (data.streak % 365 == 0) return "Incredible, " +  name + "! You've used Flames every single day for the past " + (data.streak / 365) + "year(s)! That is truly amazing. Thanks for using Flames.";
        else if (data.streak % 30 == 0) return "Wow, you've used Flames every day for the last " + (data.streak / 30) + "month(s)! Nice job.";
        else if (data.streak % 7 == 0) return "Congratulations on your " + (data.streak / 7) + "week streak.";
        else if (date.getDay() == 5) return "It's Double Friday, so all message scores are multiplied by 2 today!"
        else {
            let msgs = ["What's up?", "Nice to see you again!", "Keep it 💯"]
            if (rank.getRank(data.score) != "X") msgs.push("Maybe today's the day you finally get to X rank!")
            if (data.streak > 1) msgs.push("¡Que siga la racha!");
            if (data.score < 0) msgs.push("Let's get that Flames Score up today!");
            return msgs[Math.round(Math.random() * msgs.length)];
        }
    }
}