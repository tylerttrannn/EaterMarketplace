import { db } from './firebase';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Listing, SellerCardProps } from '../src/types/types'
import { fetchSingleListing } from './listings';


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

  export const grabUserInfo  = async () : Promise<SellerCardProps | null> => {

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser){
      return null;
    }
  
    try{
      const userRef = doc(db, "users", currentUser.uid);
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
  
  