import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div className = "min-h-screen bg-gray-50">
      
      {/* header*/}
      <div className="flex justify-between items-center p-6 bg-white shadow-md ">
        <div>
          <h1 className="text-3xl font-logo text-indigo-600">ZotMarketplace</h1>
          <div className="flex space-x-6 mt-2 text-gray-600">
            <h3 className="cursor-pointer hover:text-indigo-500">About</h3>
            <h3 className="cursor-pointer hover:text-indigo-500">Contact</h3>
            <h3 className="cursor-pointer hover:text-indigo-500">FAQ</h3>
          </div>
        </div>
        <div>
          <Button className="bg-indigo-600 text-white hover:bg-indigo-500"
                   onClick = {() => navigate('/login')}>
            Login
          </Button>
        </div>
      </div>

      {/* center content*/}
      <div className = "flex flex-col justify-center items-center py-20 space-y-6 bg-indigo-50 text-center">
        <h1 className="text-4xl font-logo text-gray-800">
            A Marketplace for Anteaters
          </h1>
          <Button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-500"
                  onClick = {() => navigate('/login')}>
            Get Started
          </Button>
      </div>

      {/* cards*/}
      <div className = "flex justify-center pt-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
          <Card className = "w-64 h-64 shadow-lg"> card 1</Card>
          <Card className = "w-64 h-64 shadow-lg"> card 2</Card>
          <Card className = "w-64 h-64 shadow-lg"> card 3</Card>
        </div>
      </div>



    </div>

  );
}

export default App;
