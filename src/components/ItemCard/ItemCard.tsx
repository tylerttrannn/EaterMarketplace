import {
    Card,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";


import { useNavigate } from "react-router-dom";

  
function ItemCard({id,itemTitle, itemPrice, itemImage}) {

  const navigate = useNavigate(); 

  function openListing(){
    console.log("key is ", id)
    navigate(`/listing/${id}`);
  }
  
  return (
    <div className="">
      <Card className="relative w-[260px] h-[260px]" onClick={() => openListing()}>
        {itemImage && 
          <img src = {itemImage} className="w-full h-full object-cover"></img>
        }
      </Card>

      <CardHeader className = "flex flex-row justify-between items-center">
        {itemTitle && (
          <CardTitle className="text-lg">{itemTitle}</CardTitle>
        )
        }
        {itemPrice && (
          <CardTitle className="text-md">${itemPrice}</CardTitle>
        )}
      </CardHeader>
    </div>


  );
}
  
export default ItemCard;
  