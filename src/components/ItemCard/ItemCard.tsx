import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  function ItemCard() {
    function openListing(){
      console.log('sdf');
    }
    return (
      <Card className="relative w-[280px] h-[280px] overflow-hidden" onClick={() => openListing()}>
        <img 
          src="https://media-photos.depop.com/b1/47700131/2253366291_0407cba6d36e45898677be3402cc4af4/P0.jpg" 
          className="w-full h-full object-cover" // Image covers the card
        />
        <CardHeader className="absolute bottom-0 left-0 right-0 text-white bg-black bg-opacity-60 p-4">
          <CardTitle className="text-lg">$20</CardTitle>
          <CardTitle className="text-md">Playstation 4</CardTitle>
        </CardHeader>
      </Card>
    );
  }
  
  export default ItemCard;
  