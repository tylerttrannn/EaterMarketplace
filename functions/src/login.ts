import functions from "firebase-functions";
import admin from "firebase-admin";
import { checkExistingName } from "./auth";

admin.initializeApp();

exports.updateUsername = functions.https.onCall(async (data) => {
  const { username } = data;

  const isAvailable = await checkExistingName(username);

  if (isAvailable) {
    return { success: true, message: "Username has been successfully created." };
  } else {
    throw new functions.https.HttpsError(
      "already-exists",
      "Username is already taken."
    );
  }
});

exports.validateEmailDomain = functions.https.onCall(async (data) => {
  const { email } = data;

  if (!email || typeof email !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The email address is required and must be a string."
    );
  }

  if (!email.endsWith("@uci.edu")) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Email is not a valid UCI account."
    );
  }

  return { success: true, message: "Email is a valid UCI account." };
});
