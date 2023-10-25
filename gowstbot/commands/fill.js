module.exports = {
    name: 'fill',
    aliases: [],
    description: "Ripete una parola fino a raggiungere 500 caratteri",
    permission: 500,
    category: "Twitch",
    cooldown: 20,
    async execute(client, channel, username, message, args) {
      if (args.length === 0) {
        return;
      }
      const word = args[0];
      let response = "";
      while (response.length < 480) {
        response += `${word} `;
      }
      await client.say(channel, response.trim());
      return null;
    },
  };