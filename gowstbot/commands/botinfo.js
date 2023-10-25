// PERCORSO DEL FILE: /c:/Users/OSX-PC/Documents/Gowstbot/gowstbot/commands/bot.js
const config = require('../../config.json')

module.exports = {
    name: 'botinfo',
    description: 'Dettagli di base del bot',
    aliases: [''],
    cooldown: 10,
    async execute(client, channel, username, message, args) {
        const botLogin = config.bot.login;
        const botPrefix = config.bot.defaultPrefix;
        client.say(channel, `${botLogin} di ${config.owner.login} | Prefisso dei comandi del bot: ${botPrefix} |  Comnadi: https://github.com/Evergowst/commands `) ;
    },
};