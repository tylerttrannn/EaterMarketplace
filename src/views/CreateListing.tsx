import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar/Navbar";
import PhotoCard from "@/components/PhotoCard/PhotoCard";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { auth, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { submitListing } from "@/api/listings";

function CreateListing() {
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  // handing file uploads 
  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // basic validation 
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
        return;
      }

      const maxSize = 10 * 1024 * 1024; 
      if (file.size > maxSize) {
        toast.error("File size exceeds the 10MB limit.");
        return;
      }

      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
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

  // Final form submission
  const handleSubmit = async () => {
    if (submitting) return; // Prevent double submissions
    setSubmitting(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("User is not authenticated.");
        return;
      }

      // Upload all selected images to Storage
      const uploadedUrls = await Promise.all(
        images.map(async (file) => {
          if (!file) return null;

          // Path must match your rules => "images/{userId}/{fileName}"
          const storageRef = ref(storage, `images/${user.uid}/${file.name}`);
          await uploadBytes(storageRef, file);

          // Get the public URL to store in Firestore or to send to your Cloud Function
          return await getDownloadURL(storageRef);
        })
      );

      // Filter out any null entries
      const imageUrls = uploadedUrls.filter((url) => url !== null) as string[];

      // Call your custom function or Cloud Function
      const result = await submitListing(
        imageUrls,
        title,
        description,
        price,
        category
      );

      // If successful
      if (result) {
        toast.success("Listing created successfully!");
        navigate(`/listing/${result}`);
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      toast.error("An error occurred while creating the listing.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-3/4 gap-6 pt-5">
        <h1 className="text-3xl">List an Item</h1>

        <div className="flex flex-col items-left gap-2 w-full max-w-2xl">
          <h3>Add up to 4 photos!</h3>
        </div>

        {/* Image upload UI */}
        <div className="grid grid-cols-2 gap-8 justify-center items-center max-w-2xl">
          {images.map((image, index) => (
            <PhotoCard
              key={index}
              image={image}
              // This passes the onChange callback for each file input
              onImageChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleImageChange(event, index)
              }
            />
          ))}
        </div>

        {/* Listing form fields */}
        <div className="flex flex-col justify-left items-left gap-4 w-full max-w-2xl">
          <h1>Title</h1>
          <Input
            placeholder="Type your title here."
            value={title}
            onChange={handleTitleChange}
            className="w-full"
          />

          <h1>Description</h1>
          <Textarea
            placeholder="Type your description here."
            value={description}
            onChange={handleDescriptionChange}
            className="w-full"
          />

          <h1>Category</h1>
          <Select value={category} onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Clothes">Clothes</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Furniture">Furniture</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
              <SelectItem value="Free">Free</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid w-[180px] max-w-sm items-center gap-1.5">
            <Label htmlFor="price">Price</Label>
            <div className="flex items-center">
              <Input
                id="price"
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="$0.00"
                className="pr-8"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-end w-full max-w-2xl">
            <Button variant="outline" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;
