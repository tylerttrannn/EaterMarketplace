import Navbar from "@/components/Navbar/Navbar";
import Category from "@/components/Category/Category";
import ItemCard from "@/components/ItemCard/ItemCard";
import { useParams } from 'react-router-dom';
import { Listing}  from "@/types/types";
import { fetchCategoryListings } from "../../functions/src/categories"
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
      }
    }

    return (
      <div className="flex flex-col">
      <Navbar />
      <Category />

      {/* Start of the new container */}
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-xl font-semibold mb-4 pt-4">{category}</h1>

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
  
  export default CategoryPage;
