import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ItemCardProps } from "@/types/types";
import { useNavigate } from "react-router-dom";

interface ExtendedItemCardProps extends ItemCardProps {
  actionType?: "open" | "edit";  
}

function ItemCard({ id, itemTitle, itemPrice, itemImage, actionType = "open" }: ExtendedItemCardProps) {
  const navigate = useNavigate();

  function openListing() {
    navigate(`/listing/${id}`);
  }

  function editListing() {
    navigate(`/edit/${id}`);
  }

  const handleClick = actionType === "edit" ? editListing : openListing;

  return (
    <div>
        <Card
          className="relative w-[185px] h-[185px] sm:w-[240px] sm:h-[240px] md:w-[260px] md:h-[260px] lg:w-[260px] lg:h-[260px] overflow-hidden rounded-none"
          onClick={handleClick}
        >

        {itemImage ? (
          <img src={itemImage} className="w-full h-full object-cover" alt={itemTitle} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            No Image Available
          </div>
        )}
      </Card>

      <CardHeader className="flex flex-row items-center justify-between gap-2">
        {itemTitle && itemPrice && (
          <CardTitle className="text-base leading-none w-full">
            <div className="mb-2 font-bold truncate w-full">
              ${itemPrice}
            </div>

            <div className="font-normal truncate w-full">
              {itemTitle}
            </div>
          </CardTitle>
        )}
      </CardHeader>

    </div>
  );
}

export default ItemCard;
 