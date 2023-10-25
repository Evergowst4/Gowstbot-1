module.exports = {
  name: 'say',
  aliases: [],
  permission: 2000,
  category: "Random",
  description: "Ripete l'intera frase successiva al comando",
  execute(client, channel, userstate, message, args) {
    if (args.length > 0) {
      const phrase = args.join(" ");
      client.say(channel, phrase);
    } else {
      // Non fare nulla se l'utente non ha scritto nulla dopo il comando
}
  },
};