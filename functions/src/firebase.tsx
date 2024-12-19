// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZOCdi6s7VEcNd0ruJN-Uzq0qTrEIMaRY",
  authDomain: "eatermarketplace.firebaseapp.com",
  projectId: "eatermarketplace",
  storageBucket: "eatermarketplace.appspot.com",
  messagingSenderId: "256517549594",
  appId: "1:256517549594:web:65dc0fa937e429a3c42ba3",
  measurementId: "G-142JWLXW6Y"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  
const db = getFirestore(app);  
const storage = getStorage(app);

export { auth, storage, db };