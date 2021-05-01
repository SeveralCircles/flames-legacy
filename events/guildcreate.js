const get_guilddata = require("../data/get_guilddata")
module.exports = {
    onGuildCreate: function(guild) {
        let data = get_guilddata.defaults
        data.name = guild.name
        get_guilddata.writeById(guild.id, data)
    }
}
