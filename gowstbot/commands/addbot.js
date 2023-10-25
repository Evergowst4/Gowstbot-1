const fs = require('fs');

module.exports = {
  name: "addbot",
  description: "Aggiunge il bot al tuo canale",
  permission: 100,
  category: "Twitch",
  cooldown: 5,
  async execute(client, channel, username, message, args) {
    // Verifica se il file di configurazione esiste
    const configFile = 'channel.json';

    // Se il file esiste, leggi il contenuto
    let channelList = [];
    if (fs.existsSync(configFile)) {
      channelList = JSON.parse(fs.readFileSync(configFile));
    }

    // Aggiungi il canale all'elenco
    if (!channelList.includes(channel)) {
      channelList.push(channel);

      // Scrivi l'elenco aggiornato nel file di configurazione
      fs.writeFileSync(configFile, JSON.stringify(channelList));

      // Messaggio di conferma all'utente
      client.say(channel, `Il bot è stato aggiunto al tuo canale, ${username}.`);
    }
  }
};
