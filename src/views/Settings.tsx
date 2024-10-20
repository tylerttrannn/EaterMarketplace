import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"


import Navbar from "@/components/Navbar/Navbar";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";


function Settings() {
    return (
        <div>
            <Navbar></Navbar>

            <div className="flex flex-row">
                {/* left side */}
                <div className="w-1/4 p-4">
                    <Command>
                        <CommandList>
                            <CommandGroup heading="Settings">
                                <CommandItem>Profile</CommandItem>
                                <CommandItem>Settings</CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </div>
                <Separator 
                    orientation="vertical" 
                    className="h-auto h-screen w-[1px] bg-gray-300 mx-4" 
                />

                {/* right side */}
                <div className="flex flex-col w-screen p-12">
                    <div className="flex flex-row justify-between items-center "> 
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <p className="text-xs">Change your email address</p>
                        </div>
                        <Button>Select</Button> 
                    </div>
                    <Separator orientation="horizontal" className="w-full h-[1px] bg-gray-300 mt-4 mb-4"  />

                </div>
            </div>
        </div>
    )
}

export default Settings;
