const tmi = require('tmi.js');
const fs = require('fs');
const util = require('util');
const config = require('./config.json');

// Convert callback functions to asynchronous functions
const query = util.promisify(connection.query).bind(connection);

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: config.bot.login,
    password: config.auth.twitch.helix.token
  },
  channels: [config.owner.login]
});

client.connect().catch(console.error);

client.on('connected', () => {
  console.log(`Bot connected to the channel ${config.owner.login}`);
  const botChannel = `#${config.bot.login}`;
  client.join(botChannel);
  console.log(`The bot has been added to the channel ${botChannel}`);
});

const commandFiles = fs.readdirSync('./gowstbot/commands/');
const commands = [];

commandFiles.forEach(file => {
  const command = require(`./gowstbot/commands/${file}`);
  if (command) {
    if (typeof command.execute === 'function') {
      commands.push(command);
    }
    if (command.aliases && Array.isArray(command.aliases)) {
      command.aliases.forEach(alias => {
        const aliasCommand = Object.assign({}, command);
        aliasCommand.name = alias;
        commands.push(aliasCommand);
      });
    }
  }
});

// Create an object to keep track of command cooldowns
const cooldowns = new Map();

client.on('message', async (channel, tags, message, self) => {
  if (self) return;

  const args = message.trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  commands.forEach(command => {
    if (command && (commandName === `${config.bot.defaultPrefix}${command.name}` || (command.aliases && command.aliases.includes(commandName))) {
      try {
        // Check if the command is on cooldown
        if (command.cooldown && typeof command.cooldown === 'number') {
          const cooldown = cooldowns.get(command.name) || 0;
          const remainingTime = cooldown - Date.now();
          if (remainingTime > 0) {
            return;
          }
        }

        // Add the command to the cooldown
        if (command.cooldown && typeof command.cooldown === 'number') {
          cooldowns.set(command.name, Date.now() + command.cooldown * 1000);
        }

        // Execute the command
        command.execute(client, channel, tags.username, message, args, connection, query);
      } catch (error) {
        console.error(error);
      }
    }
  });

  if (commandName === "!addbot" && !self) {
    const channelFile = 'channel.json';

    if (fs.existsSync(channelFile)) {
      const channelList = JSON.parse(fs.readFileSync(channelFile));
      channelList.forEach(channelToJoin => {
        const channel = `#${channelToJoin}`;
        client.join(channel).then(() => {
          console.log(`The bot has been added to the channel ${channel}`);
        }).catch(error => {
          console.error(`Error adding the bot to the channel ${channel}: ${error}`);
        });
      });
    } else {
      console.log(`The configuration file ${channelFile} does not exist`);
    }
  }
});
