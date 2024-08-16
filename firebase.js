import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

import serviceAccount from './bitsofgood-dev-application-firebase-adminsdk-ku85u-64517b652c.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export {db, admin}
