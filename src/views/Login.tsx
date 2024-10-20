import { Button } from "@/components/ui/button";
import { GoogleLogin, updateUsername } from "../../Backend/auth"; 
import { useState } from "react";
import { User } from 'firebase/auth'; 
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

function Login() {
  const [user, setUser] = useState<User | null>(null);  // State to store user info
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);  
  const [username, setUsername] = useState(''); 
  const [drawer, setDrawer] = useState(false); 

  const navigate = useNavigate(); 

  async function handleLogin() {
    try {
      const result = await GoogleLogin();  

      // check if result exsits before setting user 
      if (result && result.user) {
        setUser(result.user); 
        setIsUsernameEmpty(result.isUsernameEmpty);  

        if (result.isUsernameEmpty){
          console.log("it is empty");
          setDrawer(true)
          return; 
        }
        // sucessfull login 
        navigate('/dashboard');


      } else {
        console.error("Login failed: No user data returned.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  }

  async function handleUsernameSubmit(){
    if (user){
      const answer = await updateUsername(user, username); 
      if (answer){
        console.log("sucessful!");
        navigate('/dashboard');
      }
    }

    setDrawer(false);
    return; 
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side */}
      <div className="w-1/2 bg-gray-900">
        <div>Logo</div>
        <h1>Left side</h1>
      </div>

      {/* Right side */}
      <div className="w-1/2 bg-white flex flex-col">
        <div className="w-full flex justify-end p-4">
          <Button variant="outline">Home</Button>
        </div>

        <div className="w-full flex justify-center items-center flex-grow">
          <div className="w-3/4 flex flex-col">
            <Button onClick={handleLogin}> 
              Login with your UCI account!
            </Button>

            {/* will conditionally show in the case the username is empty on inital setup  */}
            {isUsernameEmpty && (
              <div>
                <Drawer open={drawer}>
                  <DrawerContent  >
                    <DrawerHeader>
                      <DrawerTitle>Set your username!</DrawerTitle>
                      <DrawerDescription>Type in a username below</DrawerDescription>
                      <Input 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      placeholder="Enter your username" 
                    />
                    </DrawerHeader>
                    <DrawerFooter>
                      <Button onClick = {() => handleUsernameSubmit()}>Submit</Button>
                      <Button variant="outline" onClick = { () => setDrawer(false)}>Cancel</Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
