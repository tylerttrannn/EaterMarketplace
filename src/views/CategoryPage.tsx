import Navbar from "@/components/Navbar/Navbar";
import Category from "@/components/Category/Category";
import ItemCard from "@/components/ItemCard/ItemCard";
import { useParams } from 'react-router-dom';
import { Listing}  from "@/types/types";
import { fetchCategoryListings } from "../../Backend/categories"
import { useEffect, useState } from "react";


function CategoryPage() {
    const { category } = useParams();

    const [listings, setListing] = useState<Listing[]>([]);

    useEffect(() => {
      retrieveListings();
    }, [category]);
  
    async function retrieveListings() {
      // there will always be a category to give so this is not an issue
      const allListings = await fetchCategoryListings(category!);
      if (allListings) {
        setListing(allListings);
        console.log("listings are", listings);
      }
    }

    return (
      <div className="flex flex-col">
        <Navbar />
        <Category />
  
        <h1 className="text-left">Category: {category} </h1>
  
        {/* item cards */}
        {/* mx auto centers fixed-width content (in this case our 280x280px cards)*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mx-auto p-4">
        {/* each card is set at 280px by 280px */}

        {listings.map((listing) => (
        <ItemCard
          key={listing.id} // This stays for React's internal use
          id={listing.id} // Add this line to pass the id as a prop
          itemTitle={listing.title}
          itemImage={listing.image}
          itemPrice={listing.price}
        />
        ))}
        </div>
      </div>
    );
  }
  
  export default CategoryPage;
