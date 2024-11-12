import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import Category from '@/components/Category/Category';
import ItemCard from '@/components/ItemCard/ItemCard';
import { Listing } from '@/types/types';
import { FetchQueryListing } from '../../Backend/listings';

function SearchListing() {
  const [listings, setListings] = useState<Listing[]>([]);
  const location = useLocation();
  const storedHits = location.state?.storedHits as Listing[]; 


  useEffect(() => {
    async function retrieveListings() {
      if (storedHits && storedHits.length > 0) {
        const allListings = await FetchQueryListing(storedHits);
        if (allListings) {
          setListings(allListings);
        }
      } else {
        console.warn('No stored hits found.');
      }
    }

    retrieveListings();
  }, [storedHits]); 


  return (
    <div className="flex flex-col">
      <Navbar />
      <Category />
      <h1 className="text-center">Search Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mx-auto p-4">
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
  );
}

export default SearchListing;
