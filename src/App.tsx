import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"


function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className = "min-h-screen bg-gray-50">
        {/* header*/}
        <div className="flex justify-between items-center p-6 bg-white shadow-md ">
          <div>
          <h1 className="text-3xl font-logo cursor-pointer text-indigo-600  hover:text-black"  onClick = {() => navigate('/')}>ZotMarketplace</h1>
          <div className="flex space-x-6 mt-2 text-gray-600">
              <h3 className="cursor-pointer hover:text-indigo-500" onClick = {() => navigate('/about')}>About</h3>
              <h3 className="cursor-pointer hover:text-indigo-500" onClick = {() => navigate('/contact')}>Contact</h3>
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
        <div className = "flex justify-center pt-10 ml-3 mr-3 ">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 pb-14">

          <Card className = "flex flex-col items-center">
            <CardContent>
            <img src="public/anteater1.png" alt="Descriptive alt text" className="w-full h-auto mb-4 mt-4" />
            </CardContent>
            <CardFooter>
            <p className = "">Quickly List Items to Sell</p>
            </CardFooter>
          </Card>

          <Card className = "flex flex-col items-center">
            <CardContent>
            <img src="public/anteater1.png" alt="Descriptive alt text" className="w-full h-auto mb-4 mt-4" />
            </CardContent>
            <CardFooter>
            <p className = "">Easily Mesage Between Users and Sellers</p>
            </CardFooter>
          </Card>

          <Card className = "flex flex-col items-center">
            <CardContent>
            <img src="public/anteater1.png" alt="Descriptive alt text" className="w-full h-auto mb-4 mt-4" />
            </CardContent>
            <CardFooter>
            <p className = "">Buy and Sell with UCI Verified Users</p>
            </CardFooter>
          </Card>
          </div>
        </div>

      </div>
    </>

  );
}

export default App;
