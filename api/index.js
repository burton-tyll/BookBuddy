const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose;
const port = 80


// Middleware pour analyser les requêtes JSON
app.use(express.json());

//---------
//----------Schemas
//---------

const bookSchema = new mongoose.Schema({
    "title": String,
    "img": String,
    "author": String,
    "pages": Number,
    "category": String,
    "description": String,
    "CreatorId": {
        type: mongoose.Schema.Types.ObjectId
    }
  })

  const book = mongoose.model('book', bookSchema, 'Books');

//---------
//----------Routes
//---------

//Get all books
app.get('/books', async (req, res) =>{
    const books = await book.find();
    res.json(books)
});

//Get a book with ID
app.get('/book/:id', async (req, res) =>{
    const bookId = req.params.id;
    const myBook = await book.findById({'_id': bookId});
    res.json(myBook)
})

//Delete a book with ID
app.delete('/book/:id', async (req, res) =>{
    const bookId = req.params.id;
    const myBook = await book.findByIdAndDelete({'_id': bookId});
    res.json('Livre supprimé avec succès, '+myBook+'')
})


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