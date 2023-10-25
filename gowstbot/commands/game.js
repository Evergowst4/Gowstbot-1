module.exports = {
    name: 'game',
    aliases: ["gioco"],
    description: "Restituisce il gioco corrente della stream di un utente specificato o dell'utente che ha inviato il comando",
    permission: 100,
    category: 'Twitch',
    cooldown: 5,
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
        if (!streamData || !streamData.game_name) {
          return;
        } else {
          const game = streamData.game_name;
          client.say(channel, `Il gioco corrente della stream di ${streamer} è: ${game}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
}