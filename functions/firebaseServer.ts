import admin from "firebase-admin";

admin.initializeApp()

const dbServer = admin.firestore();
const auth = admin.auth();

export {dbServer, auth}