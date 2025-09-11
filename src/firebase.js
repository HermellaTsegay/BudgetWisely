import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDqXhG1mVHp6jWqqV4KBfNBbPsIeoUYyHs",
    authDomain: "budgetwisely-3d496.firebaseapp.com",
    projectId: "budgetwisely-3d496",
    storageBucket: "budgetwisely-3d496.firebasestorage.app",
    messagingSenderId: "214258246082",
    appId: "1:214258246082:web:2b5eb38b3f6ee2e8de365b",
    measurementId: "G-F622BV4VR3"
  };
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);