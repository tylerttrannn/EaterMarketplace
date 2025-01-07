import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


const db = admin.firestore();

const isNormalEnglishText = (text: string): boolean => {
  if (!text) return false; 
  const englishTextRegex = /^[\x20-\x7E\n\r]*$/;
  return englishTextRegex.test(text);
};

export const submitListing = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }

  const { images, title, description, price, category } = data;

  // Validation
  if (!images || images.length === 0) {
    throw new functions.https.HttpsError("invalid-argument", "Please include at least 1 image.");
  }
  if (!title || title.length > 50) {
    throw new functions.https.HttpsError("invalid-argument", "Invalid title.");
  }
  if (!description || description.length > 200) {
    throw new functions.https.HttpsError("invalid-argument", "Invalid description.");
  }
  if (isNaN(Number(price)) || Number(price) <= 0) {
    throw new functions.https.HttpsError("invalid-argument", "Invalid price.");
  }
  if (!category) {
    throw new functions.https.HttpsError("invalid-argument", "Please select a category.");
  }
  if (!isNormalEnglishText(title)) {
    throw new functions.https.HttpsError("invalid-argument", "Title contains unsupported characters.");
  }
  if (!isNormalEnglishText(description)) {
    throw new functions.https.HttpsError("invalid-argument", "Description contains unsupported characters.");
  }

  const userId = context.auth.uid;

  try {
    const listingRef = await db.collection("posts").add({
      uid: userId,
      images,
      title,
      description,
      price: Number(price),
      category,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("Listing created with ID:", listingRef.id);
    return { id: listingRef.id, message: "Listing created successfully." };
  } catch (error) {
    console.error("Error creating listing:", error);
    throw new functions.https.HttpsError("internal", "An error occurred while creating the listing.");
  }
});
