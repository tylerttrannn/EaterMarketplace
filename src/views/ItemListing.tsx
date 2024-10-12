import Navbar from "@/components/Navbar/Navbar";
import Category from "@/components/Category/Category";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import SellerCard from "@/components/SellerCard/SellerCard";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

  



function ItemListing(){
    return(

        <div>
            <Navbar/>
            <Category/>

            {/* justify-start aligns items to the left\
            max-w-[1000px] limits the flex container width 
            mx-auto centers the container for it being at 1k pixels
            */}
            <div className="flex flex-row justify-start space-x-20 max-w-[1000px] mx-auto pt-10">
                <div className="flex w-[480px] h-[480px] bg-slate-400">
                    <Carousel className="w-full h-full">
                        <CarouselContent>
                            <CarouselItem>item 1</CarouselItem>
                            <CarouselItem>item 2</CarouselItem>
                            <CarouselItem>item 3</CarouselItem>
                            <CarouselItem>item 3</CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                {/* description container */}
                <div className="flex flex-col h-auto w-[400px] p-4">
                    <div className="space-y-2 pb-2">
                        <h1>
                            Levi's Women Blue Jeans
                        </h1>
                        <h1> $40.00 </h1>
                    </div>
                    
                    {/* Set parent div to w-full */}
                    <div className="flex flex-col space-y-2 w-full pb-2">
                        <Button className="w-full"> Message</Button>
                        <Button className="w-full"> Add to Saved</Button>        
                    </div>

                    <Separator />
                    <Textarea placeholder="Seller message" disabled />

                    {/* seller info container */}
                    <div className = "pt-4">
                        <SellerCard/>
                    </div>
                </div>

            </div>


        </div>
    )


}

export default ItemListing; 