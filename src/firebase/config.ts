import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "###",
  authDomain: "###",
  projectId: "###",
  storageBucket: "###",
  messagingSenderId: "###",
  appId: "###"
};

firebase.initializeApp(firebaseConfig);           // Initialize Firebase
const projectAuth = firebase.auth();              // Initialize Auth
const projectFirestore = firebase.firestore();    // Initialize Firestore

export {projectAuth, projectFirestore}