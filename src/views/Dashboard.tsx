import Navbar from "@/components/Navbar/Navbar";
import Category from "@/components/Category/Category";
import ItemCard from "@/components/ItemCard/ItemCard";



function Dashboard() {
    return (
      <div className="flex flex-col">
        <Navbar />
        <Category />
  
        <h1 className="text-center">Your feed</h1>
  
        {/* item cards */}
        {/* mx auto centers fixed-width content (in this case our 280x280px cards)*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mx-auto p-4">
        {/* each card is set at 280px by 280px */}
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
  
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
  
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </div>
    );
  }
  
  export default Dashboard;
  