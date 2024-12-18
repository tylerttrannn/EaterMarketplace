import { useState, useEffect } from "react";
import { useId } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface PhotoCardProps{
  image: File | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function PhotoCard({ image, onImageChange } : PhotoCardProps) {
  const uniqueId = useId(); // Generates a unique ID
  const inputId = `fileInput-${uniqueId}`;
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    let url: string | undefined;

    if (image) {
      url = URL.createObjectURL(image);
      if (url){
        setImageURL(url);
      }
    } else {
      setImageURL(null);
    }

    // Cleanup function to revoke the object URL
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [image]);

  return (
    <div className="w-[180px] h-[180px] lg:w-[210px] h-[210px] ">
      <label htmlFor={inputId} className="cursor-pointer">
        <Card className="hover:bg-gray-100 w-full h-full flex items-center justify-center border border-gray-300">
          <CardContent className="flex items-center justify-center p-0">

            {/* Display the image preview if available */}
            {imageURL ? (
              <img
                src={imageURL}
                alt="Image Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <p className="mt-2 text-sm">Click to add image</p>
              </div>
            )}
            
          </CardContent>

          {/* Hidden file input to select the image */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id={inputId}
            onChange={onImageChange}
          />
        </Card>
      </label>
    </div>
  );
}

export default PhotoCard;
