const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Servi i file statici dalla cartella "static"
app.use('/static', express.static(path.join(__dirname, 'static')));

// Mostra il file HTML dalla cartella "templates"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'home.html'));
});

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
