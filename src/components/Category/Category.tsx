import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Category() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center space-x-4 px-4 pt-2">

        {/*/  these buttons will always be visible regardless of screen size */}
        <Button variant="outline" onClick={() => navigate('/category/clothes')}>Clothes</Button>
        <Button variant="outline" onClick={() => navigate('/category/electronics')}>Electronics</Button>
        <Button variant="outline" onClick={() => navigate('/category/furniture')}>Furniture</Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden">
            <Button variant="outline">More</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate('/category/services')}>Services</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/category/other')}>Other</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/category/free')}>Free</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/category/requests')}>Requests</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* will hide these options when the scrren size gets smaller */}
        <div className="hidden md:flex space-x-4">
          <Button variant="outline" onClick={() => navigate('/category/services')}>Services</Button>
          <Button variant="outline" onClick={() => navigate('/category/other')}>Other</Button>
          <Button variant="outline" onClick={() => navigate('/category/free')}>Free</Button>
          <Button variant="outline" onClick={() => navigate('/category/requests')}>Requests</Button>
        </div>
      </div>
      <Separator className="mt-2" />
    </div>
  )
}

export default Category;
