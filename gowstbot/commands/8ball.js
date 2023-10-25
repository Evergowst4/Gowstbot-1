module.exports = {
    name: '8ball',
    aliases: ['eightball', 'magicball'],
    description: 'Risponde a una domanda con una risposta casuale',
    permission: 100,
    cooldown: 5,
    usage: '<domanda>',
    execute(client, channel, username, message, args) {
      const responses = [
        'Sì, sicuramente',
        'È decisamente così',
        'Senza alcun dubbio',
        'Sì, certo',
        'Puoi contarci',
        'Come la vedo io, sì',
        'Probabilmente',
        'Le prospettive sono buone',
        'Sì',
        'I segni indicano di sì',
        'Non posso predirlo ora',
        'Meglio non risponderti adesso',
        'Concentrati e riprova',
        'Non ci contare',
        'La mia risposta è no',
        'Le mie fonti dicono di no',
        'Le prospettive non sono buone',
        'Molto incerto',
        'È difficile dirlo',
        'Non posso dirti ora'
      ];
  
      if (!args.length) {
        return { text: 'Devi fare una domanda!', reply: true };
      }
  
      const response = responses[Math.floor(Math.random() * responses.length)];
      client.say(channel, ` ${response}`);
    },
  };