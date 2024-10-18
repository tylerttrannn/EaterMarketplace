import { auth, db, storage} from './firebase';  
import { doc, setDoc, getDoc, updateDoc, addDoc, arrayUnion} from 'firebase/firestore';  
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Listing, SellerCardProps}  from "@/types/types";






export const addToSaved = async (postID: string): Promise<boolean> => {
  const auth = getAuth();
  const user = auth.currentUser; 

  if (!user) {
    return false; 
  }

  try {
    const userDocRef = doc(db, "users", user.uid);

    await updateDoc(userDocRef, {
      saved: arrayUnion(postID) // adding postID to the array 
    });

    console.log("Post successfully added to saved.");
    return true;

  } catch (error) {
    console.error("Could not add the post to saved", error);
    return false; 
  }
};


export const grabUserSaved = async () :Promise<Listing[]> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if(!user){
    return []
  }

  try{
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log("No user found.");
      return [];
    }

    const data = userSnap.data();
    const savedListings = data.saved || [];

    if (savedListings.length === 0) {
      console.log("No saved listings.");
      return [];
    }

    const fetchSavedListings = savedListings.map((listingID: string) =>
      fetchSingleListing(listingID)
    );

    const listings = await Promise.all(fetchSavedListings);
    return listings.filter((listing) => listing !== null) as Listing[];

  }

  catch(error){
    console.error("there was an error that occured fetching the saved listings", error);
    return []; 
  }

}


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