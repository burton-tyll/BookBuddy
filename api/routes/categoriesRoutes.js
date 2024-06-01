const express = require('express');
const mongoose = require('mongoose');
const category = require('../models/category'); // Assurez-vous que le chemin est correct
const router = express.Router();

//---------
//----------Routes Catégories
//---------


router.get('/categories', async (req, res) => {
    const categories = await category.find()
    res.json(categories)
})

module.exports = router
