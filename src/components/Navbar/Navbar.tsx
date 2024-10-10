import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"






function Navbar() {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center px-4 pt-2">
                {/* Left-aligned app name */}
                <div className="flex-grow text-left">
                    <h3>ZotMarketplace</h3>
                </div>

                {/* Centered search bar */}
                <div className="flex-grow">
                    <Input type="email" placeholder="Search..." className="w-full max-w-md mx-auto" />
                </div>

                {/* Right-aligned buttons and avatar */}
                <div className="flex-grow flex justify-end items-center space-x-4">
                    <Button variant="outline">Sell Now</Button>
                    <Button variant="outline">Inbox</Button>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <Separator className="mt-4" />
        </div>
    );
}

export default Navbar;
