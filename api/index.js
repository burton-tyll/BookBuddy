
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/BookDataBase'


async function connectToDataBase(){
  try{
    await mongoose.connect(url);
    console.log('Connexion à la database réussie.');

  } catch(err){
    console.error('Connexion échouée.', err);
  }
}

connectToDataBase();

app.get('/', (req, res) => {
  res.send('Le serveur fonctionne et est connecté à la base de données.');
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});