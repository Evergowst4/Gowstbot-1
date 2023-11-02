const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Servi i file statici dalla cartella "static"
app.use('/static', express.static(path.join(__dirname, 'static')));

// Servi il file twitchlogin.js dalla cartella "tools"
app.use('/tools', express.static(path.join(__dirname, 'tools')));

// Mostra il file HTML dalla cartella "templates"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve i file statici dalla cartella "public"
app.use(express.static('public'));

// Avvia il server
app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
