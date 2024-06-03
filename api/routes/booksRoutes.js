const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const book = require('../models/book');
const users = require('../models/users');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');


// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const filename = file.originalname;
      cb(null, filename);
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
});

//Add a book
router.post('/addBook', async (req, res) => {
    const newBook = await book.create(req.body);
    res.json(book);
});

//Delete a book with ID
router.delete('/book/:id', async (req, res) =>{
    const bookId = req.params.id;
    const myBook = await book.findByIdAndDelete({'_id': bookId});
    res.json('Livre supprimé avec succès, '+myBook+'');
});

//Get Favorites
router.get('/favorite/:id', async (req, res) => {
    try{
        const userId = req.params.id;
        const userMatch = await users.find({'_id': userId});
        res.json(userMatch[0].favorites)
    } catch (error){
        console.error('Erreur lors de la récupération des favoris')
    }
    
});

router.post('/upload', upload.single('img'), (req, res) => {
    res.json({ filename: req.file.originalname });
});

module.exports = router