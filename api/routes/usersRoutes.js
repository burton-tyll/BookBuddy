const express = require('express');
const router = express.Router();
const userController = require('../controllers/controllers');

const authMiddleware = require('../middlewares/authMiddleware');

// Définir les routes et appeler les fonctions correspondantes

// -----------------------Routes publiques
router.put('/connexion', userController.connectUser);
router.get('/users', userController.getUsers);
router.post('/addUser', userController.addUser);


// -----------------------Routes protégées par un token
router.post('/reward/:parametre', authMiddleware, userController.postReward);
router.get('/users/:id', authMiddleware, userController.getUserById);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.put('/disconnection/:id', authMiddleware, userController.disconnectUser);

module.exports = router;
