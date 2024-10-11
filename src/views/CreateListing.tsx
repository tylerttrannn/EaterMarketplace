import Navbar from "@/components/Navbar/Navbar";
import PhotoCard from "@/components/PhotoCard/PhotoCard";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CreateListing() {

  function handleChange() {
    console.log("yes");
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full gap-6 pt-5">
        {/* list item headings */}
        <h1 className = "text-3xl ">List an Item</h1>


        <div className="flex flex-col items-left gap-2 w-full max-w-2xl ">
          <h3>Add up to 4 photos!</h3>
        </div>



        {/* 4 photo carousel */}
        <div className="flex justify-center gap-4 w-full max-w-2xl">
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
        </div>

        {/* description section */}
        <div className="flex flex-col justify-left items-left gap-4 w-full max-w-2xl">
          <h1>Description</h1>
          <Textarea
            placeholder="Type your message here."
            className="w-full"
          />

          <h1>Category</h1>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clothes">Clothes</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="free">Free</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid w-[180px] max-w-sm items-center gap-1.5">
            <Label htmlFor="price">Price</Label>
            <div className="flex items-center">
              <Input
                id="price"
                type="text"
                value={54}
                onChange={handleChange}
                placeholder="0.00"
                className="pr-8"
              />
            </div>
          </div>

        <div className="flex justify-end w-full max-w-2xl">
            <Button variant="outline">Submit</Button>
        </div>

        </div>
      </div>
    </div>
  );
}

export default CreateListing;
