const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/booksRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const path = require('path')
const app = express();
const cors = require('cors')
const port = 80;

// Middleware pour analyser les requêtes JSON
app.use(express.json());

app.use(cors());

// Utiliser les routes du fichier séparé
app.use('/', categoriesRoutes); 
// Utiliser les routes du fichier séparé
app.use('/', booksRoutes); 

// Connexion à la base de données et lancement du serveur
const startServer = async () => {
    try {
        await mongoose.connect("mongodb://localhost/BookDataBase");
        console.log('Connexion avec la base de données établie');
        app.listen(port, () => {
            console.log(`Le serveur est lancé sur http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Erreur lors de la connexion à la base de données :", error.message);
    }
};

startServer();