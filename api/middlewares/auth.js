const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'Token non fourni' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'random_secret_key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Token invalide' });
  }
};

module.exports = auth;
