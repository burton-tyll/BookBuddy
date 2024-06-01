const User = require("../models/users");
const Book = require("../models/book");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postReward = function(req, res) {
  res.send({ type: 'POST' });
};

exports.addUser = async function(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const nouveluser = new User(req.body);
      await nouveluser.save();

      const token = jwt.sign({ userId: nouveluser._id }, 'random_secret_key', { expiresIn: '1h' });

      const responseData = {
        user: nouveluser,
        token: token
      };

      res.status(201).send(responseData);
    } else {
      return res.status(409).send({ message: 'Email déjà utilisé.' });
    }
  } catch (erreur) {
    res.status(400).send(erreur);
  }
};

exports.getUsers = async function(req, res) {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).send();
    }
    return res.send(users);
  } catch (erreur) {
    res.status(500).send(erreur);
  }
};

exports.getUserById = async function(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (erreur) {
    res.status(500).send(erreur);
  }
};

exports.updateUser = async function(req, res) {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }

    Object.keys(req.body).forEach(key => {
      user[key] = req.body[key];
    });

    await user.save();

    res.send(user);
  } catch (erreur) {
    res.status(400).send(erreur);
  }
};

exports.connectUser = async function(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'Utilisateur non inscrit ou email incorrect' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Mot de passe incorrect' });
    }

    user.connected = true;
    await user.save();

    const token = jwt.sign({ userId: user._id }, '1234', { expiresIn: '1h' });

    res.send({ message: 'Utilisateur connecté avec succès', token, userId: user._id });

  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la connexion utilisateur', error });
  }
};

exports.disconnectUser = async function(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }
    user.connected = false;
    await user.save();
    res.send({ message: 'Utilisateur déconnecté avec succès' });
  } catch (err) {
    res.status(500).send({ message: 'Erreur lors de la déconnexion utilisateur', error: err });
  }
};




exports.addFavorite = async function(req, res) {
  try {
    const userId = req.userId; // ID utilisateur extrait du token
    const bookId = req.params.bookId;

    // Vérifier si le livre existe
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ message: 'Livre non trouvé' });
    }

    // Ajouter le livre aux favoris de l'utilisateur
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si le livre est déjà dans les favoris
    if (user.favorites.some(favorite => favorite.bookId === bookId)) {
      return res.status(400).send({ message: 'Livre déjà dans les favoris' });
    }

    // Ajouter le livre aux favoris
    user.favorites.push({ bookId });
    await user.save();

    res.send({ message: 'Livre ajouté aux favoris', favorites: user.favorites });
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de l\'ajout du livre aux favoris', error });
  }
};

exports.deleteFavorite = async function(req, res) {
    try {
      const userId = req.userId; // ID utilisateur extrait du token
      const bookId = req.params.bookId;
  
      // Vérifier si l'utilisateur existe
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({ message: 'Utilisateur non trouvé' });
      }
  
      // Vérifier si le livre est dans les favoris de l'utilisateur
      const favoriteIndex = user.favorites.findIndex(favorite => favorite.bookId === bookId);
      if (favoriteIndex === -1) {
        return res.status(400).send({ message: 'Livre non trouvé dans les favoris' });
      }
  
      // Supprimer le livre des favoris
      user.favorites.splice(favoriteIndex, 1);
      await user.save();
  
      res.send({ message: 'Livre supprimé des favoris', favorites: user.favorites });
    } catch (error) {
      res.status(500).send({ message: 'Erreur lors de la suppression du livre des favoris', error });
    }
  };
  
