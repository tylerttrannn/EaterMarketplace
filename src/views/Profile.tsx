import Navbar from "@/components/Navbar/Navbar";
import Category from "@/components/Category/Category";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import ItemCard from "@/components/ItemCard/ItemCard";
import { fetchUserListings } from "../../Backend/backend"
import { useEffect, useState } from "react";

function Profile() {

  const [showSelling, setShowSelling] = useState(true); // Default to selling items
  const [allListings, setallListings] = useState<Listing[]>([]);


  useEffect(() =>{
    fetchListing(); 
  }, [])

  async function fetchListing(){
    const listings = await fetchUserListings();

    if (listings){
      setallListings(listings);
    }
  }


  return (
    <div>
      <Navbar />
      <Category />

      {/* content */}
      <div className="flex flex-col px-4 md:px-8 items-center"> 
        
        {/* profile pic + name + menu bar */}
        <div className="flex flex-row space-x-4 items-center mt-8"> 
          <Avatar className="w-24 h-24"> {/* Adjust the width and height */}
            <AvatarImage src="https://bpb-us-e2.wpmucdn.com/sites.oit.uci.edu/dist/c/2/files/2022/07/R22_OIT_ProfessorAnteaterfortheOITHomepage_Icon_1000x1000.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Label>Peter the Anteater</Label>
            <p className="text-xs">Active Today</p>
          </div>
        </div>

        {/* menu bar */}
        <div className="mt-4 flex space-x-4">
          <Toggle 
            pressed={showSelling} 
            onPressedChange={() => setShowSelling(true)}
          >
            Selling
          </Toggle>
          <Toggle 
            pressed={!showSelling} 
            onPressedChange={() => setShowSelling(false)}
          >
            Saved
          </Toggle>
        </div>


        {/* listing content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mt-8"> 
          {showSelling && (allListings.map((listing) =>(
            <ItemCard
            key={listing.id} // This stays for React's internal use
            id={listing.id} // Add this line to pass the id as a prop
            itemTitle={listing.title}
            itemImage={listing.image}
            itemPrice={listing.price}
            />
          )))}


        </div>
      </div>
    </div>
  );
}

export default Profile;
