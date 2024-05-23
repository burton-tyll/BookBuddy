const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')
const book = require('../models/book'); // Assurez-vous que le chemin est correct
const router = express.Router();

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Dossier où les fichiers seront enregistrés
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Renommer le fichier avec un timestamp
    }
});

const upload = multer({ storage: storage });

//---------
//----------Routes
//---------

//Get all books
router.get('/books', async (req, res) =>{
    const books = await book.find();
    res.json(books)
});

//Get a book with ID
router.get('/book/:id', async (req, res) =>{
    const bookId = req.params.id;
    const myBook = await book.findById({'_id': bookId});
    res.json(myBook)
})

//Add a book
router.post('/addBook', async (req, res) => {
    const newBook = await book.create(req.body);
    res.json(book)
})

//Delete a book with ID
router.delete('/book/:id', async (req, res) =>{
    const bookId = req.params.id;
    const myBook = await book.findByIdAndDelete({'_id': bookId});
    res.json('Livre supprimé avec succès, '+myBook+'');
})

//Get locals pictures and upload on the database
router.post('/upload', upload.single('img'), (req, res) => {
    if (req.file) {
        console.log('Fichier téléchargé:', req.file);
        res.status(200).send('Image uploaded successfully');
    } else {
        res.status(400).send('Failed to upload image');
    }
});

module.exports = router