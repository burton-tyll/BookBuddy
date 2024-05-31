const User = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
      
      // Générer un token JWT pour cet utilisateur
      const token = jwt.sign({ userId: nouveluser._id }, 'random_secret_key', { expiresIn: '1h' });

      // Construire l'objet de réponse avec les données de l'utilisateur et le token
      const responseData = {
        user: nouveluser,
        token: token
      };

      // Envoyer la réponse avec le statut 201
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
    console.log(users);
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

    // Mettre à jour les propriétés de l'utilisateur
    Object.keys(req.body).forEach(key => {
      user[key] = req.body[key];
    });

    // Sauvegarder l'utilisateur mis à jour pour déclencher les hooks Mongoose
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

    const token = jwt.sign({ userId: user._id }, 'random_secret_key', { expiresIn: '1h' });

    res.send({ message: 'Utilisateur connecté avec succès', token, userId: user._id }); // Inclure l'ID utilisateur dans la réponse

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
    user.connected = false; // Modifier la valeur de connected à false
    await user.save(); // Sauvegarder les modifications
    res.send({ message: 'Utilisateur déconnecté avec succès' });
  } catch (err) {
    res.status(500).send({ message: 'Erreur lors de la déconnexion utilisateur', error: err });
  }
};