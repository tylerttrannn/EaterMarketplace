import Navbar from "@/components/Navbar/Navbar";
import PhotoCard from "@/components/PhotoCard/PhotoCard";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { addListing } from "../../Backend/backend"


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";


/*

note to myself becuase the listners were confusing me for a
little bit

User Action:
The user clicks on the label in the PhotoCard, which triggers the file selection dialog.
Event Triggered:
The user selects a file (or removes it), triggering the onChange event.
Event Handler Called:
The handleImageChange function is called with the event and the index.
State Updated:
The images array is updated to reflect the new state (file added or removed).
UI Reflects State:
The component re-renders, and the PhotoCard displays the updated image or placeholder.
*/

function CreateListing() {

  const [images, setImages] = useState([null,null,null,null]) ;
  const [description, setDescription] = useState("");
  const [cateogry, setCategory] = useState(null);
  const [price, setPrice] = useState(0);


  async function submitListing() {
    const result = await addListing(images,description,cateogry, price);  

    if(result){
      console.log("item added!");
    }
    
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>, index : number) {
    const file = event.target.files[0];

    // Create a copy of the images array
    const newImages = [...images];

    // Update the image at the specific index
    newImages[index] = file;

    // Update the state with the new array
    setImages(newImages);
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value); // Update the state with the textarea value
  };

  
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
          {/* simply providing the image to the component for  it to render which we intially set when 
            we did onImageChange for image ={image} */}
          {images.map((image, index) => ( 
            <PhotoCard
              key={index}
              image={image}
              onImageChange={(event: React.ChangeEvent<HTMLInputElement>) => handleImageChange(event, index)}
            />

           ))} 
        </div>

        {/* description section */}
        <div className="flex flex-col justify-left items-left gap-4 w-full max-w-2xl">
          <h1>Description</h1>
          <Textarea
            placeholder="Type your description here."
            value={description} // Bind the textarea to the state
            onChange={handleDescriptionChange} // Handle the change event
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
              type="number"
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
              placeholder="$0.00"
              min="0.00" 
              step="0.01" 
              className="pr-8"
            />
            </div>
          </div>

        <div className="flex justify-end w-full max-w-2xl">
            <Button variant="outline" onClick = {() => submitListing()}>Submit</Button>
        </div>

        </div>
      </div>
    </div>
  );
}

export default CreateListing;
