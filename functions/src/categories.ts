import { db } from '../../firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { Listing } from '../../src/types/types'

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
          image: data.images,
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