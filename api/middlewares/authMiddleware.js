const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, '1234'); // Utilisez votre clé secrète pour vérifier le token
        req.userId = decoded.userId; // Assurez-vous que le token contient un userId
        console.log('Token valid, userId:', req.userId);
        next();
    } catch (err) {
        console.log('Invalid token:', err.message);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
