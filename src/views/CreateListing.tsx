import Navbar from "@/components/Navbar/Navbar";
import PhotoCard from "@/components/PhotoCard/PhotoCard";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { addListing } from "../../Backend/listings"


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


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
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null]); // this can accept both file and null types 
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();



  async function submitListing() {
    const validationErrors = [
      { condition: images.every(image => image === null), message: "Please Include at Least 1 Image" },
      { condition: title === "", message: "Please include a title" },
      { condition: description === "", message: "Please include a description" },
      { condition: category === "", message: "Please select a category!" }
    ];
  
    // see if any violation occurs
    for (const { condition, message } of validationErrors) {
      if (condition) {
        toast.error(message);
        return; 
      }
    }

    const itemPrice = price === "" ? 0 : Number(price);
  
    const result = await addListing(images, description, category, itemPrice, title);
    if (result != null) {
      toast.success("Item Listing Created!");
      navigate(`/listing/${result}`);
    }
  }
  

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>, index : number) {
    if (event.target.files){
      const file = event.target.files[0];

      // Create a copy of the images array
      const newImages = [...images];
      // Update the image at the specific index
      newImages[index] = file;

      // Update the state with the new array
      setImages(newImages);
    }

  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    // Allow the value to be empty or numeric
    if (value === "" || !isNaN(Number(value))) {
      setPrice(value);
    }
  };


  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
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

          <h1> Title</h1>
          <Input
            placeholder="Type your title here."
            value={title} // Bind the textarea to the state
            onChange={handleTitleChange} // Handle the change event
            className="w-full"
          >
          </Input>


          <h1>Description</h1>
          <Textarea
            placeholder="Type your description here."
            value={description} // Bind the textarea to the state
            onChange={handleDescriptionChange} // Handle the change event
            className="w-full"
          />

          <h1>Category</h1>
          <Select value={category} onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Theme" />
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
                type="text" // Use text type to allow empty string and numeric input
                value={price}
                onChange={handlePriceChange}
                placeholder="$0.00"
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
