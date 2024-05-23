const express = require('express');
const mongoose = require('mongoose');
const genre = require('../models/genre'); // Assurez-vous que le chemin est correct
const router = express.Router();

//---------
//----------Routes
//---------

router.get('/genres', async (req, res) => {
    const genres = await genre.find()
    res.json(genres)
})

module.exports = router