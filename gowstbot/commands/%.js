module.exports = {
    name: '%',
    aliases: ['percent', 'randompercent'],
    description: 'Restituisce un numero casuale compreso tra 0.00% e 100.00%.',
    permission: 100,
    category: 'fun',
    cooldown: 15,
    execute(client, channel, username, message, args, connection, query) {
      const min = 0;
      const max = 100;
      const randomNum = (Math.random() * (max - min) + min).toFixed(2);
      client.say(channel, `${randomNum}%`);
    }
  };
