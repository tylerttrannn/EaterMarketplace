import Navbar from "@/components/Navbar/Navbar";
import { fetchUserListings} from "../../Backend/listings"
import { useEffect, useState } from "react";
import { Listing } from "@/types/types";
import ItemCard from "@/components/ItemCard/ItemCard";

function Manage(){
    const [allListings, setallListings] = useState<Listing[]>([]);

    const [isFetched, setIsFetched] = useState(false);


    let hasFetched = false;

    async function fetchListing() {
      if (hasFetched) return;
      hasFetched = true;
    
      const listings = await fetchUserListings();
      if (listings) {
        setallListings(listings);
      }
    }
    

    useEffect(() => {
        if (!isFetched) {
          fetchListing();
          setIsFetched(true);
        }
    }, []); 
      
    
    return (
        // manage container 
        <div>
            <Navbar/>
            <div> 
                <div className ="flex flex-col justify-center items-center pt-4">
                    <h1 className =  "text-5xl font-bold"> Manage Your Listings </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mt-8"> 
                    {allListings &&
                    allListings.map((listing) => {
                        // Debug log for the image being passed                        
                        return (
                        <div key={listing.id}>
                            <ItemCard
                            id={listing.id}
                            itemTitle={listing.title}
                            itemImage={listing.image} // Ensure it's a string
                            itemPrice={listing.price}
                            actionType="edit"
                            />
                        </div>
                        );
                        })}


                     </div>
                </div>


            </div>

            
        </div>
    )

}

export default Manage; 