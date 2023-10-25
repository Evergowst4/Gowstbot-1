module.exports = {
  name: 'afk',
  aliases: ['brb'],
  description: 'Contrassegna come AFK (lontano dalla tastiera) o BRB (torno subito).',
  permission: '100',
  category: 'AFK',
  cooldown: 0,

  afkStatus: {},
  afkTime: {},

  execute(client, channel, username, message, args) {
    const command = message.split(' ')[0];
    const status = args.join(' ');

    if (command === '!afk') {
      this.afkStatus[username] = status || 'nessun messaggio';
      this.afkTime[username] = Date.now();
      client.say(channel, `@${username} è ora AFK: ${this.afkStatus[username]}`);
    } else if (command === '!brb') {
      delete this.afkStatus[username];
      delete this.afkTime[username];
    }
  },

  onMessage(client, channel, userstate, message, self) {
    const username = userstate.username;
    if (this.afkStatus[username] && username !== client.getUsername()) {
      const timeElapsed = Date.now() - this.afkTime[username];
      const timeUnits = this.getTimeUnits(timeElapsed);
      client.say(channel, `@${username} non è più AFK: ${this.afkStatus[username]} (${timeUnits} fa)`);
      delete this.afkStatus[username];
      delete this.afkTime[username];
    }
  },

  getTimeUnits(timeElapsed) {
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (timeElapsed < minute) {
      return `${Math.floor(timeElapsed / 1000)} secondi`;
    } else if (timeElapsed < hour) {
      return `${Math.floor(timeElapsed / minute)} minuti`;
    } else if (timeElapsed < day) {
      return `${Math.floor(timeElapsed / hour)} ore`;
    } else {
      return `${Math.floor(timeElapsed / day)} giorni`;
    }
  }
};
