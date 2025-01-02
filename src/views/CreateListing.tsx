import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import PhotoCard from "@/components/PhotoCard/PhotoCard";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitListing } from "@/api/listings";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CreateListing() {
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const base64Images = await Promise.all(
        images.map(async (file) => {
          if (!file) return null;
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result?.toString().split(",")[1] || "");
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        })
      );

      // api call here
      const result = await submitListing(
        base64Images.filter((img) => img !== null) as string[],
        title,
        description,
        price,
        category
      );

      if (result) {
        toast.success("Listing created successfully!");
        navigate(`/listing/${result}`);
      }
    } 
    catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the listing.");
    } 
    finally {
      setSubmitting(false);
    }
  };

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    if (event.target.files) {
      const file = event.target.files[0];
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
        return;
      }

      const maxSize = 10 * 1024 * 1024;
      const minSize = 0.05 * 1024 * 1024;

      if (file.size < minSize) {
        toast.error("Image size needs to be larger");
        return;
      }

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

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-3/4 gap-6 pt-5">
        <h1 className="text-3xl">List an Item</h1>

        <div className="flex flex-col items-left gap-2 w-full max-w-2xl">
          <h3>Add up to 4 photos!</h3>
        </div>

        <div className="grid grid-cols-2 gap-8 justify-center items-center max-w-2xl">
          {images.map((image, index) => (
            <PhotoCard
              key={index}
              image={image}
              onImageChange={(event: React.ChangeEvent<HTMLInputElement>) => handleImageChange(event, index)}
            />
          ))}
        </div>

        <div className="flex flex-col justify-left items-left gap-4 w-full max-w-2xl">
          <h1>Title</h1>
          <Input placeholder="Type your title here." value={title} onChange={handleTitleChange} className="w-full" />

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
              <SelectValue placeholder="Select a Theme" />
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
