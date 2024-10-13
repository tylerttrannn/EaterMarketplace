import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
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
                <div className="w-1/5">
                    <Command>
                        <CommandInput placeholder="Type a command or search..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Suggestions">
                                <CommandItem>Calendar</CommandItem>
                                <CommandItem>Search Emoji</CommandItem>
                                <CommandItem>Calculator</CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="Settings">
                                <CommandItem>Profile</CommandItem>
                                <CommandItem>Billing</CommandItem>
                                <CommandItem>Settings</CommandItem>
                            </CommandGroup>
                        </CommandList>

                    </Command>
                </div>

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


                    <div className="flex flex-row justify-between items-center "> 
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <p className="text-xs">Change your email address</p>
                        </div>
                        <Button>Select</Button> 
                    </div>
                    <Separator orientation="horizontal" className="w-full h-[1px] bg-gray-300 mt-4 mb-4"  />


                    <div className="flex flex-row justify-between items-center "> 
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <p className="text-xs">Change your email address</p>
                        </div>
                        <Button>Select</Button> 
                    </div>
                    <Separator orientation="horizontal" className="w-full h-[1px] bg-gray-300 mt-4 mb-4"  />


                    <div className="flex flex-row justify-between items-center "> 
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <p className="text-xs">Change your email address</p>
                        </div>
                        <Button>Select</Button> 
                    </div>
                    <Separator orientation="horizontal" className="w-full h-[1px] bg-gray-300 mt-4 mb-4"  />

                    <div className="flex flex-row justify-between items-center "> 
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <p className="text-xs">Change your email address</p>
                        </div>
                        <Button>Select</Button> 
                    </div>
                    <Separator orientation="horizontal" className="w-full h-[1px] bg-gray-300 mt-4 mb-4"  />


                    <div className="flex flex-row justify-between items-center "> 
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <p className="text-xs">Change your email address</p>
                        </div>
                        <Button>Select</Button> 
                    </div>
                    <Separator orientation="horizontal" className="w-full h-[1px] bg-gray-300 mt-4 mb-4"  />

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
