export const colors = [
    { name: 'Red', value: '#e31123' },
    { name: 'Pink', value: '#ed5588' },
    { name: 'Dark pink', value: '#bf1077' },
    { name: 'Dark green', value: '#108272' },
    { name: 'Blue', value: '#193e91' },
    { name: 'Violet', value: '#b144c0' },
]

export const allowedChannels = {}

if(process.env.DISCORD_DEVELOPMENT_GUILD_ID) {
   allowedChannels[process.env.DISCORD_DEVELOPMENT_GUILD_ID] = [ '1372684490022981763' ];
}

if(process.env.DISCORD_DEVELOPMENT_GUILD_ID) {
   allowedChannels[process.env.DISCORD_PRODUCTION_GUILD_ID] = [ '1370757771133194270' ];
}

