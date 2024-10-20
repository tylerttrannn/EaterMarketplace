import {
    Card,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";


import { ItemCardProps } from "@/types/types";
import { useNavigate } from "react-router-dom";

  
function ItemCard({ id, itemTitle, itemPrice, itemImage }: ItemCardProps) {
  const navigate = useNavigate();

  function openListing() {
    navigate(`/listing/${id}`);
  }

  return (
    <div>
      <Card className="relative w-[260px] h-[260px] overflow-hidden rounded-none" onClick={() => openListing()}>
        {itemImage ? (
          <img src={itemImage} className="w-full h-full object-cover" alt={itemTitle} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            No Image Available
          </div>
        )}
      </Card>

      <CardHeader className="flex flex-row justify-between items-center">
        {itemTitle && <CardTitle className="text-lg">{itemTitle}</CardTitle>}
        {itemPrice && <CardTitle className="text-md">${itemPrice}</CardTitle>}
      </CardHeader>
    </div>
  );
}

export default ItemCard;
