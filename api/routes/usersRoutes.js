const express = require('express');
const router = express.Router();
const userController = require('../controllers/controllers');

const auth = require('../middlewares/auth');

// Définir les routes et appeler les fonctions correspondantes

// -----------------------Routes publiques
router.put('/connexion', userController.connectUser);
router.get('/users', userController.getUsers);
router.post('/addUser', userController.addUser);

// -----------------------Routes protégées par un token
router.post('/reward/:parametre', auth, userController.postReward);
router.get('/users/:id', auth, userController.getUserById);
router.put('/users/:id', auth, userController.updateUser);
router.put('/disconnection/:id', auth, userController.disconnectUser);
router.post('/addFavorite/:bookId', auth, userController.addFavorite); // Nouvelle route

module.exports = router;
