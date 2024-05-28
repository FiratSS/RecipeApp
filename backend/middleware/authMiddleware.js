const admin = require('../firebaseAdmin'); // Adjust the path if needed

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) return res.status(401).send({ message: 'No token provided.' });

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Adds user info to the request object
        next();
    } catch (error) {
        res.status(403).send({ message: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
