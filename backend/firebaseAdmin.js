const admin = require('firebase-admin');
const serviceAccount = require('./secrets/firebaseServiceAccount.json');  // Updated path to the renamed file

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL // Ensure this is set in your .env file
});

module.exports = admin;