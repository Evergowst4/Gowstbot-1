const axios = require('axios');
const banlist = require('../../banlist.json');

module.exports = {
  name: 'emotes',
  description: 'Mostra le emoticon e i badge del canale specificato',
  aliases: ['emoticons', 'badges','channelemotes','ce'],
  usage: '!emotes <nomecanale>',
  cooldown: '5',
  async execute(client, channel, user, message, args) {
    const channelName = args[0];
    const url = `https://okayeg.com/twitch/emotes#${channelName}`;

    // Controllo banlist
    const messageWords = message.trim().split(/ +/);
    const bannedWords = messageWords.filter(word => banlist.includes(word.toLowerCase()));
    if (bannedWords.length > 0) {
      client.say(channel, '[Banphrased]');
      return;
    }

    try {
      await axios.get(url);
      client.say(channel, `Le emotes di @${channelName} possono essere trovate qui: ${url}`);
    } catch (error) {
      console.error(error);
      client.say(channel, `Errore durante la ricerca delle emote di @${channelName}`);
    }
  }
};