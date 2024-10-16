import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  
function ItemCard({itemTitle, itemPrice, itemImage}) {
  function openListing(){
    console.log('sdf');
  }

  return (
    <Card className="relative w-[280px] h-[280px] overflow-hidden" onClick={() => openListing()}>
      {itemImage && 
        <img src = {itemImage} className="w-full h-full object-cover"></img>
      }

      <CardHeader className="absolute bottom-0 left-0 right-0 text-white bg-black bg-opacity-60 p-4">

        {itemTitle && (
          <CardTitle className="text-lg">{itemTitle}</CardTitle>
        )
        }

        {itemPrice && (
          <CardTitle className="text-md">${itemPrice}</CardTitle>
        )}

      </CardHeader>
    </Card>


  );
}
  
export default ItemCard;
  