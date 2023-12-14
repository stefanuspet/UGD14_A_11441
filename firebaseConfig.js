// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAajO3DJHcG2RclfXz8-fhPPNEh6Xvay5o",
    authDomain: "pw-firebase-11441.firebaseapp.com",
    databaseURL: "https://pw-firebase-11441-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pw-firebase-11441",
    storageBucket: "pw-firebase-11441.appspot.com",
    messagingSenderId: "786433963450",
    appId: "1:786433963450:web:cd2bf5e543d21b4af09983"
};

// Initialize Firebase
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const app = initializeApp(firebaseConfig);
export default app;
const auth = getAuth(app);
const db = getDatabase(app);
export { db, auth };