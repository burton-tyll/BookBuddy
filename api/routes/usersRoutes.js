const express = require('express');
const router = express.Router();
const User = require("../models/users");

router.post('/reword/:parametre', function(req, res) {
  res.send({ type: 'POST' });
});

router.post('/addUser', async function(req, res) {
  try {
    const nouvelUtilisateur = new User(req.body);
    await nouvelUtilisateur.save();
    res.status(201).send(nouvelUtilisateur);
  } catch (erreur) {
    res.status(400).send(erreur);
  }
});

router.get('/users', async function(req, res) {
  try {
    const utilisateur = await User.find();
    if (!utilisateur) {
      return res.status(404).send();
    }
    console.log(utilisateur);
    return(res.send(utilisateur));
  } catch (erreur) {
    res.status(500).send(erreur);
  }
});

router.get('/users/:id', async function(req, res) {
  try {
    const utilisateur = await User.findById(req.params.id);
    if (!utilisateur) {
      return res.status(404).send();
    }
    res.send(utilisateur);
  } catch (erreur) {
    res.status(500).send(erreur);
  }
});

router.put('/users/:id', async function(req, res) {
  try {
    const utilisateur = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!utilisateur) {
      return res.status(404).send();
    }
    res.send(utilisateur);
  } catch (erreur) {
    res.status(400).send(erreur);
  }
});

router.post('/connexion', async function(req, res) {
  try {
    const userId = User.findByID(req.params.id);
    const userName = User.findByName(req.params.name);
    await User.updateOne({ _id: userId }, { $set: { connected: true } });
    res.send({ message: 'User connected' });
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
