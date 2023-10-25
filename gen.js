const fs = require('fs-extra');
const path = require('path');

const commandsDir = path.join(__dirname, 'gowstbot', 'commands');
const outputFilePath = path.join(__dirname, 'commands.md');

// Leggi tutti i file nella cartella dei comandi
fs.readdir(commandsDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  // Filtra i file con estensione .js
  const jsFiles = files.filter((file) => file.endsWith('.js'));

  // Crea un array di oggetti comando
  const commands = jsFiles.map((file) => {
    const command = require(path.join(commandsDir, file));
    return {
      name: command.name,
      aliases: command.aliases || [],
      usage: command.usage || '',
      description: command.description || '',
      cooldown: command.cooldown || 0,
      permission: command.permission || 'everyone'
    };
  });

  // Crea il contenuto del file Markdown
  const markdownContent = commands.map((command) => {
    const aliases = command.aliases.length > 0 ? command.aliases.join(', ') : '-';
    const usage = command.usage ? command.usage : '-';
    const description = command.description ? command.description : '-';
    const cooldown = command.cooldown > 0 ? `${command.cooldown} secondi` : '-';
    const permission = command.permission ? command.permission : '-';
    return `| ${command.name} | ${aliases} | ${usage} | ${description} | ${cooldown} | ${permission} |\n`;
  }).join('');

  // Scrivi il contenuto nel file Markdown
  fs.writeFile(outputFilePath, markdownContent, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Il file ${outputFilePath} è stato creato con successo.`);
  });
});