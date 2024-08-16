import admin from 'firebase-admin';
import serviceAccount from './bitsofgood-dev-application-firebase-adminsdk-ku85u-64517b652c.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // No need to include databaseURL since you're using Firestore
});

const db = admin.firestore();  // Initialize Firestore

export default db;  // Export Firestore instance for use in other files
