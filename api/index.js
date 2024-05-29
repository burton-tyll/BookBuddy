const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/BookDataBase';
const userRoutes = require('./routes/usersRoutes');


// Ajoute cors comme middleware global pour accepter les requêtes de tous les domaines
app.use(cors());

app.use(express.json()); // Middleware pour parser les corps de requête en JSON
app.use(userRoutes); // Chemin de base pour les routes des utilisateurs

async function connectToDataBase() {
  try {
    await mongoose.connect(url);
    console.log('Connexion à la base de données réussie.');
  } catch (err) {
    console.error('Connexion échouée.', err);
  }
}

connectToDataBase();

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
