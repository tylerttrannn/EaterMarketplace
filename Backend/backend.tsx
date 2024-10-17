import { GoogleAuthProvider, signInWithPopup, User} from 'firebase/auth';
import { auth, db, storage} from './firebase';  
import { doc, setDoc, getDoc, updateDoc, addDoc} from 'firebase/firestore';  
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Listing, SellerCardProps}  from "@/types/types";


/*
import {  onAuthStateChanged } from "firebase/auth";
import { Trophy } from 'lucide-react';
*/



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
          saved: []
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


export const addListing = async (listingImages: (File | null)[], listingDescription : string , listingCategory : string, listingPrice: number, listingTitle: string): Promise<boolean> => {
  
    try{

      const auth = getAuth();
      const user = auth.currentUser;

      if (user){
        const imageUrls = [];

        for (let i = 0; i < listingImages.length; i++){
          const image = listingImages[i]; 
          // grab url 
          if(image){
            // creating a  reference on where to store 
            const storageRef = ref(storage, `posts/${user.uid}/${Date.now()}_${image.name}`);
            // uploads the images to firebase
            await uploadBytes(storageRef, image);
            // grabs the download urls for the image
            const downloadURL = await getDownloadURL(storageRef);
            // pushes the image to the list 
            imageUrls.push(downloadURL);
          }
        }

        await addDoc(collection(db, "posts"), {
          uid: user.uid, 
          images: imageUrls,
          description: listingDescription,
          category: listingCategory,
          price: listingPrice,
          createdAt: new Date(),
          title: listingTitle,
        });
        
        console.log("item sucessfully added!");
        return true; 
      }

      console.error("User is not authenticated.");
      return false; 
  
    }

    catch(error){
      console.error("An error has occured trying to add an item", error); 
      return false; 
    }

}

/*

this function will query the 25 most newlely listed 
items to put on the dashbaord page when users
first login 
 */
export const fetchDashboardListings = async () : Promise<Listing[]>  => {
  try{
    const postsRef = collection(db, "posts");
    // order by the createdt timestamp in descending order up to 25 items 
    const q = query(postsRef, orderBy("createdAt", "desc"), limit(25));

    const querySnapshot = await getDocs(q);

    const listings = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id || "no-id",
        uid: data.uid,
        title: data.title,
        image: data.images && data.images.length > 0 ? data.images[0] : null,
        price: data.price,
        description: data.description,
      };
    });
    

    return listings; 
  } catch(error){
    console.error("failed to retrieve the dashboard listings", error); 
    return [];
    
  }

};


export const fetchUserListings = async (): Promise<Listing[]> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.log("User is not authenticated");
    return [];
  }

  try {
    console.log("Fetching listings for user UID:", user.uid);
    const postRef = collection(db, "posts");
    const q = query(postRef, where("uid", "==", user.uid));

    // Get the documents for that user
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No listings found for this user.");
      return [];
    }

    const listings = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        uid: data.uid,
        title: data.title,
        image: data.images && data.images.length > 0 ? data.images[0] : null,
        price: data.price,
        description: data.description,
      };
    });
    

    console.log("Fetched listings:", listings);
    return listings;
  } catch (error) {
    console.error("An error occurred fetching the listings:", error);
    return [];
  }
};


export const fetchSingleListing = async (listingID: string): Promise<Listing | null> => {
  try {
    const postRef = doc(db, "posts", listingID); 
    const docSnap = await getDoc(postRef);

    // Check if the document exists
    if (!docSnap.exists()) {
      console.log("No listing found for this listingID.");
      return null;
    }

    const data = docSnap.data();

    const listing = {
      id: docSnap.id, // Use docSnap.id for the document ID becuase the document ID is not apart of the documents data
      uid: data.uid,
      title: data.title,
      image: data.images, // All images for the carousel
      price: data.price,
      description: data.description,
    };

    return listing;

  } catch (error) {
    console.log("Could not fetch the listing", error);
    return null; // Return null in case of an error
  }
};


export const grabSellerInfo = async (sellerID: string) : Promise<SellerCardProps | null> => {

  try{
    const userRef = doc(db, "users", sellerID);
    const sellerSnap = await getDoc(userRef);

    if (!sellerSnap.exists()) {
      console.log("No seller found.");
      return null;
    }
    const data = sellerSnap.data();

    const user = {
      user : data.userName,
      onlineStatus : data.lastLogin,
      photo : data.profilePic
    }
    
    return user; 

  }

  catch(error){
    console.error("there was an error that occured grabbing the seller info!", error);
    return null; 
  }

}


export const fetchCategoryListings = async( categoryID: string) : Promise<Listing[]> => {
  
    try{
      const postRef = collection(db, "posts"); 
      const q = query(postRef, where("category", "==", categoryID), limit(25));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No listings found for this category.");
        return [];
      }

      const listings = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          uid: data.uid,
          title: data.title,
          image: data.images && data.images.length > 0 ? data.images[0] : null,
          price: data.price,
          description: data.description,
        };
      });
    
      return listings; 
    }

    catch(error){
      console.error("There was an error fetching the categories for", categoryID, error); 
      return [];
    }
}