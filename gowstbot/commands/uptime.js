module.exports = {
  name: 'uptime',
  aliases: ['streamuptime'],
  description: 'Get the current stream uptime',
  permission: '',
  category: 'Twitch',
  cooldown: 10,
  async getOfflineDuration(channelName) {
    const config = require('../../config.json');
    const clientId = config.auth.twitch.helix.clientId;
    const token = config.auth.twitch.helix.token;
    const url = `https://api.twitch.tv/helix/streams?user_login=${channelName}`;
    const headers = {
      'Client-ID': clientId,
      'Authorization': `Bearer ${token}`,
    };
  
c
    const response = await fetch.default(url, { headers });
    const data = await response.json();
  
    if (data.data.length > 0) {
      return '';
    } else {
      const url2 = `https://api.twitch.tv/helix/users?login=${channelName}`;
      const response2 = await fetch.default(url2, { headers });
      const data2 = await response2.json();
  
      if (data2.data.length > 0) {
        const userId = data2.data[0].id;
        const url3 = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
        const response3 = await fetch.default(url3, { headers });
        const data3 = await response3.json();
  
        if (data3.data.length > 0) {
          const streamEnd = new Date(data3.data[0].ended_at);
          const now = new Date();
          const offlineSeconds = Math.floor((now - streamEnd) / 1000);
          const offlineMinutes = Math.floor(offlineSeconds / 60);
  
          if (offlineMinutes === 0) {
            return 'meno di un minuto';
          } else if (offlineMinutes < 60) {
            return `${offlineMinutes} minuti`;
          } else {
            const offlineHours = Math.floor(offlineMinutes / 60);
            const remainingMinutes = offlineMinutes % 60;
            if (remainingMinutes === 0) {
              return `${offlineHours} ore`;
            } else {
              return `${offlineHours} ore, ${remainingMinutes} minuti`;
            }
          }
        } else {
          return 'Il canale non è attualmente in onda';
        }
      } else {
        return '';
      }
    }
  },
  
  async execute(client, channel, username, message, args) {
    async function getStreamStatus(channelName, username) {
      const fetch = await import('node-fetch');
      const config = require('../../config.json');
      const clientId = config.auth.twitch.helix.clientId;
      const url = `https://api.twitch.tv/helix/streams?user_login=${channelName}`;
      const headers = {
        'Client-ID': clientId,
        'Authorization': `Bearer ${config.auth.twitch.helix.token}`,
      };
  
      const response = await fetch.default(url, { headers });
      const data = await response.json();
  
      if (data.data.length > 0) {
        const streamStart = new Date(data.data[0].started_at);
        const now = new Date();
        const uptimeSeconds = Math.floor((now - streamStart) / 1000);
        const uptimeMinutes = Math.floor(uptimeSeconds / 60);
        if (uptimeMinutes < 60) {
          return `${channelName} è online da ${uptimeMinutes} minuti`;
        } else {
          const uptimeHours = Math.floor(uptimeMinutes / 60);
          return `${channelName} è online da ${uptimeHours} ore, ${uptimeMinutes % 60} minuti`;
        }
      } else {
        const offlineDuration = await module.exports.getOfflineDuration(channelName);
        if (offlineDuration === '') {
          return `${channelName} non esiste o non è stato trovato`;
        } else {
          return `${channelName} è offline da ${offlineDuration}`;
        }
      }
    }
  
    const channelName = args[0] ? args[0].toLowerCase() : channel.slice(1).toLowerCase();
    try {
      const status = await getStreamStatus(channelName, username);
      client.say(channel, status);
    } catch (err) {
      console.error(err);
    }
  },
};