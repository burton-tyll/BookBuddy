const express = require('express');
const mongoose = require('mongoose');
const category = require('../models/category'); // Assurez-vous que le chemin est correct
const router = express.Router();

//---------
//----------Routes
//---------

router.get('/categories', (req, res) => {
    res.send('coucou')
})