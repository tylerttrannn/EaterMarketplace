"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functions = exports.db = exports.storage = exports.auth = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const storage_1 = require("firebase/storage");
const functions_1 = require("firebase/functions");
const firebaseConfig = {
    apiKey: "AIzaSyDZOCdi6s7VEcNd0ruJN-Uzq0qTrEIMaRY",
    authDomain: "eatermarketplace.firebaseapp.com",
    projectId: "eatermarketplace",
    storageBucket: "eatermarketplace.appspot.com",
    messagingSenderId: "256517549594",
    appId: "1:256517549594:web:65dc0fa937e429a3c42ba3",
    measurementId: "G-142JWLXW6Y",
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
const storage = (0, storage_1.getStorage)(app);
exports.storage = storage;
const functions = (0, functions_1.getFunctions)(app);
exports.functions = functions;
