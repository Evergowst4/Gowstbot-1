  module.exports = {
    name: "title",
    aliases: ["titolo"],
    description: "Restituisce il titolo attuale dello stream o del canale specificato dall'utente.",
    permission: 100,
    category: 'Twitch',
    cooldown: 10,
    async execute(client, channel, username, message, args) {
      try {
      const config = require('../../config.json');
      let streamer = args[0] || username;
      if (streamer.startsWith('@')) {
        streamer = streamer.substring(1);
      }
  
      const { default: got } = await import('got');
      const response = await got(`https://api.twitch.tv/helix/users?login=${streamer}`, {
        headers: {
          'Client-ID': config.auth.twitch.helix.clientId,
          'Authorization': `Bearer ${config.auth.twitch.helix.token}`
        }
      });
      const data = JSON.parse(response.body).data[0];
      if (!data) {
        return;
      }
      const broadcasterId = data.id;
      const streamResponse = await got(`https://api.twitch.tv/helix/channels?broadcaster_id=${broadcasterId}`, {
        headers: {
          'Client-ID': config.auth.twitch.helix.clientId,
          'Authorization': `Bearer ${config.auth.twitch.helix.token}`
        }
      });
      const streamData = JSON.parse(streamResponse.body).data[0];
      if (!streamData || !streamData.title) {
        return;
      } else {
        const title = streamData.title;
                client.say(channel, `Il titolo corrente della stream di ${streamer} è: ${title}`);
      }
    } catch (error) {
      console.error(error);
          }
  }
}
