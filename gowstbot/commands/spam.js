const regex = require('../../tools/regex.js');

module.exports = {
  name: 'spam',
  aliases: '',
  description: 'Spamma un messaggio nella chat',
  permissison: '1000',
  cooldown: 30,
  usage: '<count> <messaggio>',
  async execute(client, channel, userstate, message, args) {
    const count = parseInt(args[0]);
    const phrase = args.slice(1).join(' ').replace('!', 'ǃ').replace('=', '꓿').replace('$', '💲');

    if (isNaN(count) || count < 2 || count > 100) {
      return;
  }

    if (regex.racism.test(phrase)) {
      return;
  }

    for (let i = 0; i < count; i++) {
      client.say(channel, phrase);
    }
},
};