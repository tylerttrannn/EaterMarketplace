import Navbar from "@/components/Navbar/Navbar";
import Category from "@/components/Category/Category";
import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard/ItemCard";
import { fetchDashboardListings } from "../../Backend/backend"


interface Listing {
  id: string;
  uid: string;
  title: string;
  image: string; 
  price: number;
  description: string;
}

function Dashboard() {
  const [listings, setListing] = useState<Listing[]>([]);

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
      <h1 className="text-center">Your feed</h1>

      {/* item cards */}
      {/* mx auto centers fixed-width content (in this case our 280x280px cards)*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mx-auto p-4">
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
  
  export default Dashboard;
  