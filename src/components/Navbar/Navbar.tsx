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
  

function Navbar() {

    const navigate = useNavigate();


    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center px-4 pt-2">
                {/* Left-aligned app name */}
                <div className="flex-grow text-left">
                    <h3 onClick = {()=> navigate('/dashboard')}>ZotMarketplace</h3>
                </div>

                {/* Centered search bar */}
                <div className="flex-grow">
                    <Input type="email" placeholder="Search..." className="w-full max-w-md mx-auto" />
                </div>

                {/* Right-aligned buttons and avatar */}
                <div className="flex-grow flex justify-end items-center space-x-4">
                    <Button variant="outline" onClick = {() => navigate('/create')}>Sell Now</Button>
                    <Button variant="outline" onClick = {() => navigate('/inbox')} >Inbox</Button>

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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


            
                </div>
            </div>

            <Separator className="mt-4" />
        </div>
    );
}

export default Navbar;
