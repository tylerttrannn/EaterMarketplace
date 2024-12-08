import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import Unauthorized from "@/components/Unauthorized/Unauthorized";
import SearchComponent from "@/views/search";
import { grabProfilePic } from "../../../Backend/user";


function Navbar() {
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);
    const [ProfilePic, setProfilePic] = useState("");
    const auth = getAuth();

    async function fetchUserInfo(){
      const userInfo = await grabProfilePic();
      if (userInfo){
        setProfilePic(userInfo);
      }
    }
    useEffect(() => {
      fetchUserInfo();
    }, []); 
  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, update state to show authorized content
            setAuthorized(true);
          } else {
            // User is not signed in, show unauthorized content
            setAuthorized(false);
          }
        });
    
        // Clean up the listener on unmount (this listener will stop looking for changes to auth)
        return () => unsubscribe();
      }, [auth]);
    
      if (!authorized) {
        return <Unauthorized />;
      }

    async function logout(){
        signOut(auth);
        navigate('/');
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center px-4 pt-2">
                {/* Left-aligned app name */}
                <div className="flex-grow text-left font-logo">
                    <h3 onClick = {()=> navigate('/dashboard')}>ZotMarketplace</h3>
                </div>

                <div className="flex justify-center ">
                  <SearchComponent></SearchComponent>
                </div>

                {/* Right-aligned buttons and avatar 
                mx-auto centers a container
                */}
                <div className="flex-grow flex justify-end items-center space-x-2 sm:space-x-4">
                    <Button variant="outline" onClick = {() => navigate('/create')}>Sell Now</Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={ProfilePic}/>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick = {()=> navigate('/profile')}>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick = {()=> navigate('/inbox')}>Inbox</DropdownMenuItem>
                            <DropdownMenuItem onClick = {()=> navigate('/manage')}>Listings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick = {() => logout() }>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


            
                </div>
            </div>

            <Separator className="mt-4" />
        </div>
    );
}

export default Navbar;
