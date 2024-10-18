import { Input } from "@/components/ui/input"
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



function Navbar() {
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); 
    const auth = getAuth();

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

    function handleSearch(e) {
      e.preventDefault(); // Prevent default form behavior 
      navigate(`/search/${searchQuery}`); 
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center px-4 pt-2">
                {/* Left-aligned app name */}
                <div className="flex-grow text-left">
                    <h3 onClick = {()=> navigate('/dashboard')}>ZotMarketplace</h3>
                </div>

                {/* Centered search bar */}
                <div className="flex-grow">
                  <form onSubmit={handleSearch}>
                    <Input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)} 
                      className="w-full max-w-md mx-auto"
                    />
                  </form>
                </div>

                {/* Right-aligned buttons and avatar 
                mx-auto centers a container
                */}
                <div className="flex-grow flex justify-end items-center space-x-2 sm:space-x-4">
                    <Button variant="outline" onClick = {() => navigate('/create')}>Sell Now</Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src="https://bpb-us-e2.wpmucdn.com/sites.oit.uci.edu/dist/c/2/files/2022/07/R22_OIT_ProfessorAnteaterfortheOITHomepage_Icon_1000x1000.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick = {()=> navigate('/profile')}>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick = {()=> navigate('/settings')}>Settings</DropdownMenuItem>
                            <DropdownMenuItem onClick = {()=> navigate('/inbox')}>Inbox</DropdownMenuItem>


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
