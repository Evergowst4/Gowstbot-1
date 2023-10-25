const axios = require('axios');

module.exports = {
    name: "7tv",
    aliases: [""],
    description: "Ottieni le emote 7TV per un canale specifico",
    permission: 100,
    category: 'Twitch',
    cooldown: 5,
    async execute(client, channel, username, message, args) {
        let user = args[0]; // Assumiamo che il nome utente sia il primo argomento

        // Se non viene specificato un utente, utilizza il canale corrente
        if (!user) {
            user = channel.slice(1); // Rimuovi il carattere '#' dal nome del canale
        }

        try {
            const response = await axios.get(`https://7tv.io/v3/users/twitch/${user}`);
            const emotes = response.data.data;
            const emoteNames = emotes.map(emote => emote.name).join(', ');

            return client.say(channel, `7TV Emotes per ${user} (${emotes.length}/totale): ${emoteNames}`);
        } catch (error) {
            console.error(error);
            return client.say(channel, `@${username}, non sono riuscito a ottenere le emote per ${user}.`);
        }
    },
};
