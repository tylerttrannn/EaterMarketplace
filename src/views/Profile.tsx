import Navbar from "@/components/Navbar/Navbar";
import Category from "@/components/Category/Category";
import { Toggle } from "@/components/ui/toggle";
import ItemCard from "@/components/ItemCard/ItemCard";
import { fetchUserListings} from "../../Backend/listings"

import { grabUserSaved, grabUserInfo} from "../../Backend/user"
import { ItemCardProps } from "@/types/types";
import SellerCard from "@/components/SellerCard/SellerCard";
import { SellerCardProps } from "@/types/types";


import { useEffect, useState } from "react";


function Profile() {

  const [showSelling, setShowSelling] = useState(true); // Default to selling items
  const [allListings, setallListings] = useState<ItemCardProps[]>([]);
  const [user, setUser] = useState<SellerCardProps>();

  useEffect(() => {
    fetchUserInfo();
  }, []); 

  useEffect(() => {
    if (showSelling) {
      fetchListing();
    } else {
      fetchSaved();
    }
  }, [showSelling]); // Re-run effect when showSelling changes


  async function fetchListing(){
    const listings = await fetchUserListings();

    if (listings){
      setallListings(listings);
    }
  }

  async function fetchUserInfo(){
    const userInfo = await grabUserInfo();
    if (userInfo){
      setUser(userInfo);
    }
  }

  async function fetchSaved(){
    const listings = await grabUserSaved();

    if (listings){
      setallListings(listings);
      console.log("all listings", listings);
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
          <SellerCard
          user={user ? user.user : "Loading..."}
          //onlineStatus= {user ? user.onlineStatus : "Loading..."}
          onlineStatus= {user ? user.onlineStatus : "Loading..."}

          photo = {user ? user.photo: "load"}          
          />
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
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center mt-8"> 
          {showSelling && (allListings.map((listing) =>(
            <ItemCard
            key={listing.id} // This stays for React's internal use
            id={listing.id} // Add this line to pass the id as a prop
            itemTitle={listing.itemTitle}
            itemImage = {listing.itemImage}
            itemPrice={listing.itemPrice}
            />
          )))}


          {!showSelling && (allListings.map((listing) =>(
            <ItemCard
            key={listing.id} // This stays for React's internal use
            id={listing.id} // Add this line to pass the id as a prop
            itemTitle={listing.itemTitle}
            // itemImage={listing.image ? listing.image[0] :"https://bpb-us-e2.wpmucdn.com/sites.oit.uci.edu/dist/c/2/files/2022/07/R22_OIT_ProfessorAnteaterfortheOITHomepage_Icon_1000x1000.png" }
            itemImage = {listing.itemImage}
            itemPrice={listing.itemPrice}
            />
          )))}


        </div>
      </div>
    </div>
  );
}

export default Profile;
