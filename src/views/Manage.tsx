import Navbar from "@/components/Navbar/Navbar";
import { fetchUserListings} from "../../functions/src/listings"
import { useEffect, useState } from "react";
import { ItemCardProps } from "@/types/types";
import ItemCard from "@/components/ItemCard/ItemCard";

function Manage(){
    const [allListings, setallListings] = useState<ItemCardProps[]>([]);

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
                    <h1 className =  "text-2xl sm:text-3xl md:text-4xl font-bold"> Manage Your Listings </h1>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center mt-8"> 
                    {allListings &&
                    allListings.map((listing) => {
                        // Debug log for the image being passed                        
                        return (
                        <div key={listing.id}>
                            <ItemCard
                            id={listing.id}
                            itemTitle={listing.itemTitle}
                            itemImage={listing.itemImage} // Ensure it's a string
                            itemPrice={listing.itemPrice}
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