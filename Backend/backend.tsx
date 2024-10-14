import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from './firebase_config';  
import { doc, setDoc, getDoc} from 'firebase/firestore';  
import { User } from 'firebase/auth'; 


export const GoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    const userDocRef = doc(db, "users", user.uid);  

    // user info to store in database 
    const userData = {
      uid: user.uid,         
      email: user.email,     
      userName: null, 
      profilePic: user.photoURL, 
      lastLogin: new Date(),  
      saved: []
    };

    // set the document 
    await setDoc(userDocRef, userData, { merge: true });  

    console.log("User logged in:", user);
    console.log("Access Token:", token);

    const isUsernameEmpty = await checkemptyUsername(user);
    return { user, isUsernameEmpty }; 

  } catch (error) {
    console.error('Error during Google login:', error);
  }
};


export const checkemptyUsername = async (user) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef); 
  
      if (userDoc.exists() && userDoc.data().userName === null) {
        return true; 
      } else {
        return false;  
      }
  
    } catch (error) {
      console.error("Error checking username:", error);
      return false; 
    }
  };


