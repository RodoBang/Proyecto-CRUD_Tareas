// firebaseConfig.js
const admin = require('firebase-admin');
const serviceAccount = require('./crud-tareas-301cc-firebase-adminsdk-gh62k-54f6a8d2d2.json'); // Asegúrate de colocar la ruta correcta al archivo JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://crud-tareas-301cc.firebaseio.com" // Reemplaza con tu URL de base de datos de Firestore
});

const db = admin.firestore();

module.exports = { admin, db };
