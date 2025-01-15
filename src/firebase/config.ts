import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Timestamp } from 'firebase/firestore';

import { firebaseConfig } from './private';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Auth
const projectAuth = getAuth(app);
// Initialize Firestore
const projectFirestore = getFirestore(app);
// Initialize Storage
const projectStorage = getStorage(app);

const timestamp = Timestamp;

export { projectAuth, projectFirestore, projectStorage, timestamp };
