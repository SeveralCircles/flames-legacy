import get_guilddata = require("../data/get_guilddata")
export function onGuildCreate(guild) {
    let data = get_guilddata.defaults
    data.name = guild.name
    get_guilddata.writeById(guild.id, data)
}
