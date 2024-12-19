import Navbar from "@/components/Navbar/Navbar";
import Category from "@/components/Category/Category";
import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard/ItemCard";
import { fetchDashboardListings } from "../../functions/src/listings";
import { Listing } from "@/types/types";


function Dashboard() {
  const [listings, setListing] = useState<Listing[]>([]);
  
  {/* 
    useRef is used a a flag to check if a component has already been 
    rendered once 

    sonnar for some reason renderes it twice so we need to do it like this 
    */}
  useEffect(() => {

    retrieveListings();
  }, []);
  

  async function retrieveListings() {
    const allListings = await fetchDashboardListings();
    if (allListings) {
      setListing(allListings);
    }
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <Category />

      {/* Start of the new container */}
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-xl font-semibold mb-4 pt-4">All Listings</h1>
        {/* Item cards */}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 font-sans">
          {listings.map((listing) => (
            <ItemCard
              key={listing.id}
              id={listing.id}
              itemTitle={listing.title}
              itemImage={listing.image[0]}
              itemPrice={listing.price}
            />
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;
