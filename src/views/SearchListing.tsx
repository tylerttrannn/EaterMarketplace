import Navbar from "@/components/Navbar/Navbar";
import Category from "@/components/Category/Category";
import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard/ItemCard";
import { Listing}  from "@/types/types";
import { fetchQueryListing } from "../../Backend/listings";
import { useParams } from 'react-router-dom';


function SearchListing() {
  const [listings, setListing] = useState<Listing[]>([]);

  const { query } = useParams();

  useEffect(() => {
    retrieveListings();
  }, []);

  async function retrieveListings() {
    if (query){
      const allListings = await fetchQueryListing(query);
      console.log("query")
      if (allListings) {
        setListing(allListings);
      }
    }

  }
  
  return (
    <div className="flex flex-col">
      <Navbar />
      <Category />
      <h1 className="text-center">{query}</h1>

      {/* item cards */}
      {/* mx auto centers fixed-width content (in this case our 280x280px cards)*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mx-auto p-4">
      {listings.map((listing) => (
        <ItemCard
          key={listing.id} // This stays for React's internal use
          id={listing.id} // Add this line to pass the id as a prop
          itemTitle={listing.title}
          itemImage={listing.image[0]}
          itemPrice={listing.price}
        />
      ))}
      </div>
    </div>
  );
  }
  
  export default SearchListing;
  