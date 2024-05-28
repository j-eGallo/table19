const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configurer le serveur pour servir des fichiers statiques à partir du dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint pour obtenir les données
app.get('/data', (req, res) => {
    fs.readFile('db.json', (err, data) => {
        if (err) throw err;
        res.send(JSON.parse(data));
    });
});

// Endpoint pour mettre à jour les données
app.post('/update', (req, res) => {
    fs.writeFile('db.json', JSON.stringify(req.body, null, 2), (err) => {
        if (err) throw err;
        res.send({ message: 'Data updated successfully' });
    });
});

// Route pour servir le fichier index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
