import Navbar from "@/components/Navbar/Navbar";
import Category from "@/components/Category/Category";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import SellerCard from "@/components/SellerCard/SellerCard";
import { addToSaved } from "../../Backend/user";
import { createConversation } from "../../Backend/chatbox";
import { grabSellerInfo } from "../../Backend/user";
import { fetchSingleListing } from "../../Backend/listings";
import { useParams } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Listing, SellerCardProps } from "@/types/types";

function ItemListing() {
  const [itemListing, setItemListing] = useState<Listing | null>(null);
  const [seller, setSeller] = useState<SellerCardProps | null>(null);
  const [active, setActive] = useState<string>("");
  const { id } = useParams<{ id: string }>(); // id is possibly undefined, so useParams must be typed

  useEffect(() => {
    if (id) {
      retrieveListing(id); 
    }
  }, [id]);

  useEffect(() => {
    if (itemListing) {
      sellerInfo(itemListing.uid); 
    }
  }, [itemListing]);

  // Fetch the listing based on the provided ID
  async function retrieveListing(listingId: string) {
    const listing = await fetchSingleListing(listingId);
    if (listing) {
      setItemListing(listing);
    }
  }

  // Fetch the seller info based on the itemListing's UID
  async function sellerInfo(uid: string) {
    const sellerInfo = await grabSellerInfo(uid);
    if (sellerInfo) {
      setSeller(sellerInfo);
      const onlineStatus = sellerInfo.onlineStatus?.toLocaleString() || "Unavailable"; // Handle possible null onlineStatus
      setActive(onlineStatus);
    }
  }

  if (!itemListing) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Category />

      {/* Flex container */}
      <div className="flex flex-col sm:flex-row justify-start sm:space-x-20 space-y-10 sm:space-y-0 max-w-[1000px] mx-auto pt-10">
        {/* Carousel */}
        <div className="flex w-[380px] h-[380px] sm:w-[480px] h-[480px] bg-slate-400 items-center mx-auto">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {itemListing.image && itemListing.image.length > 0 ? (
                itemListing.image.map((url, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={url}
                      alt={`Item image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                ))
              ) : (
                <div>No images available</div> // if no images exist 
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Description container */}
        <div className="flex flex-col h-auto w-full sm:w-[400px] p-4">
          <div className="space-y-2 pb-2">
            <h1>{itemListing.title}</h1>
            <h1>${itemListing.price}</h1>
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-2 w-full pb-2">
            <Button className="w-full" onClick={() => createConversation(itemListing.uid)}>Message</Button>
            <Button className="w-full" onClick={() => id && addToSaved(id)}>Add to Saved</Button> {/* Ensure id exists */}
          </div>

          <Separator />
          <Textarea placeholder="Seller message" value={itemListing.description} disabled />

          {/* Seller info */}
          <div className="pt-4">
            <SellerCard
              user={seller ? seller.user : "Loading..."}
              onlineStatus={active}
              photo={seller ? seller.photo : "load"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemListing;
