import Navbar from "@/components/Navbar/Navbar";
import Category from "@/components/Category/Category";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import SellerCard from "@/components/SellerCard/SellerCard";
import {addToSaved} from "../../Backend/user"
import {grabSellerInfo} from "../../Backend/user"
import {fetchSingleListing} from "../../Backend/listings"

import { useParams } from 'react-router-dom';
import { Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious,} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

import { SellerCardProps } from '../src/types/types'

function ItemListing() {
  const [itemListing, setitemListing] = useState(null); 
  const [seller, setSeller] = useState(null); 
  const [active, setActive] = useState("");
  const { id } = useParams(); 

  useEffect(() => {
    retrieveListing(); 
  }, [id]); 

  useEffect(() => {
    if (itemListing) {
      sellerInfo();
    }
  }, [itemListing]);
   
  async function retrieveListing() {
    const listing = await fetchSingleListing(id);
    if (listing){
      setitemListing(listing);
    }
  }

  async function sellerInfo() {
    const sellerInfo = await grabSellerInfo(itemListing.uid);
    if (sellerInfo){
      setSeller(sellerInfo);
      const onlineStatus = sellerInfo.onlineStatus.toDate().toLocaleString();
    setActive(onlineStatus);

    }
  }
  

  if (!itemListing) {
    return <div>Loading...</div>; 
  }

  return (
    <div >
      <Navbar />
      <Category />

      {/*  flex flex-col sm:flex-row 
      (starts off as flex-row and moves to flex-col on smaller screen)
      */}
      <div className="flex flex-col sm:flex-row justify-start sm:space-x-20 space-y-10 sm:space-y-0 max-w-[1000px] mx-auto pt-10">

        {/* Carousel
        mx-auto centers a container
        */}
        <div className="flex w-[380px] h-[380px] sm:w-[480px] h-[480px] bg-slate-400 items-center mx-auto">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {itemListing.image && itemListing.image.map((url, index) => (
                <CarouselItem key={index}>
                  <img
                    src={url}
                    alt={`Item image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </CarouselItem>
              ))}
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
            <Button className="w-full">Message</Button>
            <Button className="w-full" onClick = {() => addToSaved(id)}>Add to Saved</Button>
          </div>

          <Separator />
          <Textarea placeholder="Seller message" value = {itemListing.description} disabled />

          {/* Seller info */}
          <div className="pt-4">
            <SellerCard 
              user={seller ? seller.user : "Loading..."}
              onlineStatus= {active}
              photo = {seller ? seller.photo: "load"}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default ItemListing;
