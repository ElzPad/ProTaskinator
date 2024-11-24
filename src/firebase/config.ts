import firebase from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "###",
  authDomain: "###",
  projectId: "###",
  storageBucket: "###",
  messagingSenderId: "###",
  appId: "###"
};

const app = firebase.initializeApp(firebaseConfig);       // Initialize Firebase
const projectAuth = getAuth(app);                         // Initialize Auth
const projectFirestore = getFirestore(app);               // Initialize Firestore

export {projectAuth, projectFirestore}