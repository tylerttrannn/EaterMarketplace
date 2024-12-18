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

  import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"



import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import Unauthorized from "@/components/Unauthorized/Unauthorized";
import SearchComponent from "@/views/search";
import { grabProfilePic } from "../../../Backend/user";
import search_icon from "../../assets/search_icon.png";


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
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between items-center px-4 pt-2">
                {/* Left-aligned app name */}
                <div className="flex-grow text-left font-logo flex-row">
                    <div className = "flex flex-row space-x-4">
                      <Sheet>
                        <SheetTrigger className = "sm:hidden">☰</SheetTrigger>
                        <SheetContent side = {"left"} >
                          <div className = "space-y-4">
                            <SheetTitle className="hover:text-blue-500 cursor-pointer" onClick = {() => navigate('/search')}>Search </SheetTitle>
                            <SheetTitle className="hover:text-blue-500 cursor-pointer" onClick = {() => navigate('/create')}>Sell Now </SheetTitle>
                            <SheetTitle className="hover:text-blue-500 cursor-pointer" onClick = {() => navigate('/profile')}>Profile</SheetTitle>
                            <SheetTitle  className="hover:text-blue-500 cursor-pointer" onClick = {() => navigate('/settings')}>Settings</SheetTitle>
                          </div>
                        </SheetContent>
                      </Sheet>

                      <h3 onClick = {()=> navigate('/dashboard')}>ZotMarketplace</h3>
                    </div>
                </div>
                
                <div className="hidden sm:flex justify-center">
                  <SearchComponent></SearchComponent>
                </div>

                {/* Right-aligned buttons and avatar 
                mx-auto centers a container
                */}
                <div className="flex-grow flex justify-end items-center space-x-2 sm:space-x-4">
                    <Button className = "hidden sm:flex "variant="outline" onClick = {() => navigate('/create')}>Sell Now</Button>
                    <img className="h-6 w-6 rounded-full mr-4 sm:hidden"  onClick = {() => navigate('/search')}src={search_icon} alt="Search Icon" />

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
