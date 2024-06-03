const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/booksRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const genresRoutes = require('./routes/genresRoutes');
const userRoutes = require('./routes/usersRoutes');

const path = require('path')
const app = express();
const cors = require('cors')

const port = 80;
const adress = 'localhost'

app.use(cors());


// Middleware pour analyser les requêtes JSON
app.use(express.json());



// Utiliser les routes des fichiers séparés
app.use('/', categoriesRoutes);
app.use('/', booksRoutes);
app.use('/', genresRoutes);
app.use(userRoutes); // Chemin de base pour les routes des utilisateurs

// Définir le dossier "uploads" comme dossier statique
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connexion à la base de données et lancement du serveur
const startServer = async () => {
    try {
        await mongoose.connect(`mongodb://${adress}/BookDataBase`);
        console.log('Connexion avec la base de données établie');
        app.listen(port, () => {
            console.log(`Le serveur est lancé sur http://${adress}:${port}`);
        });
    } catch (error) {
        console.error("Erreur lors de la connexion à la base de données :", error.message);
    }
};

startServer();