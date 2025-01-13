import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { functions } from "../../firebase";

export const GoogleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    // Sign in with Google
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user.email) {
      throw new Error("Email is required for login.");
    }

    // Reference to user document
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    let isUsernameEmpty = false;

    if (!userDoc.exists()) {
      // New user logic
      const validateEmail = httpsCallable<{ email: string }, { success: boolean; message: string }>(
        functions,
        "validateEmailDomain"
      );
      const response = await validateEmail({ email: user.email });
      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Invalid email domain.");
      }

      const userData = {
        uid: user.uid,
        email: user.email,
        userName: null,
        profilePic: user.photoURL,
        lastLogin: new Date(),
        conversations: [],
      };

      await setDoc(userDocRef, userData);
      console.log("New user created:", userData);

      isUsernameEmpty = true;
    } else {
      const existingUserData = userDoc.data();
      await setDoc(userDocRef, { lastLogin: new Date() }, { merge: true });
      console.log("Existing user logged in, lastLogin updated");

      // Check if username is empty for existing users
      isUsernameEmpty = existingUserData.userName === null;
    }

    return { user, isUsernameEmpty };
  } catch (error) {
    console.error("Error during Google login:", error);
    return { user: null, isUsernameEmpty: false };
  }
};


export const checkExistingName = async (username : string) : Promise<boolean> => {
    try{
        const usersRef = collection(db, "users")
        const q = query(usersRef, where("userName", "==", username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty){
            console.log("username avaliable! ")
            return true; 
        }

        console.log("username not avaliable ")
        return false; 
    }

    catch (error){
        console.error("Cannot check for existing name ", error); 
        return false;
    }
}

