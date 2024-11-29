import Navbar from "@/components/Navbar/Navbar";
import { fetchUserListings} from "../../Backend/listings"
import { useEffect, useState } from "react";
import { Listing } from "@/types/types";
import ItemCard from "@/components/ItemCard/ItemCard";

function Manage(){
    const [allListings, setallListings] = useState<Listing[]>([]);

    
    async function fetchListing(){
        const listings = await fetchUserListings();
    
        if (listings){
          setallListings(listings);
        }
      }


    useEffect(() => {
        fetchListing();
    }, []); // Re-run effect when showSelling changes
    
    
    
    return (
        // manage container 
        <div>
            <Navbar/>
            <div> 
                <div>
                    <h1 className =  "text-7xl font-bold"> Manage Your Listings </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mt-8"> 
                        {allListings && (allListings.map((listing) =>(
                            <ItemCard
                            key={listing.id} // This stays for React's internal use
                            id={listing.id} // Add this line to pass the id as a prop
                            itemTitle={listing.title}
                            //itemImage={listing.image}
                            itemImage = "https://bpb-us-e2.wpmucdn.com/sites.oit.uci.edu/dist/c/2/files/2022/07/R22_OIT_ProfessorAnteaterfortheOITHomepage_Icon_1000x1000.png"
                            itemPrice={listing.price}
                            actionType = "edit"
                            />
                        )))}

                     </div>
                </div>



            </div>

            
        </div>
    )

}

export default Manage; 