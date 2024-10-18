import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth, db } from './firebase';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';


export const GoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
  
      const userDocRef = doc(db, "users", user.uid);
  
      // check if the user has already logged in before
      const userDoc = await getDoc(userDocRef);
  
      // adding new user 
      if (!userDoc.exists()) {
        const userData = {
          uid: user.uid,
          email: user.email,
          userName: null,  
          profilePic: user.photoURL,
          lastLogin: new Date(),
          conversations: []
        };

        await setDoc(userDocRef, userData);  
        console.log("New user created:", userData);
      } 
      else {
        // updating lastLogin 
        await setDoc(userDocRef, { lastLogin: new Date() }, { merge: true });
        console.log("Existing user logged in, lastLogin updated");
      }
  
      console.log("User logged in:", user);
      console.log("Access Token:", token);
  
      const isUsernameEmpty = await checkemptyUsername(user);
      return { user, isUsernameEmpty };
  
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };




export const checkemptyUsername = async (user: User): Promise<boolean> => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef); 

      console.log("userDoc is ", userDoc);
  
      if (userDoc.exists() && userDoc.data().userName === null) {
         console.log("username does not exist from checkemprtyusername!");
        return true; 
      } else {
        return false;  
      }
  
    } catch (error) {
      console.error("Error checking username:", error);
      return false; 
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

export const updateUsername = async (user : User, username: string): Promise<boolean> => {
    try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef); 
    
        // update username if the user exists 
        if (userDoc.exists() && userDoc.data().userName === null){
            const usernameAvaliable = await checkExistingName(username); 

            if (usernameAvaliable){
                await updateDoc(userDocRef, {
                    userName: username
                });
                console.log("Username sucesfully set!");
                return true; 
            }

            console.log("username is already taken!");
            return false; 
        }

        return false; 
    }

    catch(error){
        console.error("Error changing username: ", error); 
        return false; 

    }
};