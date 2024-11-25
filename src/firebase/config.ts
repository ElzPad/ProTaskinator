import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

import { firebaseConfig } from './private';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Auth
const projectAuth = getAuth(app);
// Initialize Firestore
const projectFirestore = getFirestore(app);

const timestamp = Timestamp;

export { projectAuth, projectFirestore, timestamp };
