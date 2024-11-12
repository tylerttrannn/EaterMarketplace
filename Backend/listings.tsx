import { db, storage } from './firebase';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, addDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Listing } from '@/types/types';


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

};



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
          image: data.images,
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
    return null; 
  }
};

// for now this will only do essentialy exact queries and partial words 
// looking at a solution for partial queries later 
export const FetchQueryListing = async (typsenseListing: Listing[]): Promise<Listing[]> => {
  try {
    const answer = await Promise.all(
      typsenseListing.map(async (listing) => {
        return fetchSingleListing(listing.id); // This might return `Listing | null`
      })
    );

    // Filter out null values
    return answer.filter((item): item is Listing => item !== null);
  } catch (error) {
    console.error("An error occurred fetching the listings:", error);
    return [];
  }
};




  