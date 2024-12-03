import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Category() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
        <div className="flex justify-center items-center space-x-2 px-4 pt-2 ">

            {/* These buttons will always be visible regardless of screen size */}
            <Button variant="outline" onClick={() => navigate('/category/Clothes')}>Clothes</Button>
            <Button variant="outline" onClick={() => navigate('/category/Electronics')}>Electronics</Button>
            <Button variant="outline" onClick={() => navigate('/category/Furniture')}>Furniture</Button>

            <DropdownMenu>
            {/* using asChild to avoid button the component rendering a button nesting 
            the buttons */}
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className = " md:hidden">More</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigate('/category/Services')}>Services</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/category/Other')}>Other</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/category/Free')}>Free</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/category/Requests')}>Requests</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>

            {/* Will hide these options when the screen size gets smaller */}
            <div className="hidden md:flex space-x-2">
            <Button variant="outline" onClick={() => navigate('/category/Services')}>Services</Button>
            <Button variant="outline" onClick={() => navigate('/category/Other')}>Other</Button>
            <Button variant="outline" onClick={() => navigate('/category/Free')}>Free</Button>
            <Button variant="outline" onClick={() => navigate('/category/Requests')}>Requests</Button>
            </div>
        </div>
        <Separator className="mt-2" />
    </div>
  );
}

export default Category;
