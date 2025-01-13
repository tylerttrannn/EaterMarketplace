import {  httpsCallable } from "firebase/functions";
import {functions} from "../../firebase"
import { toast } from "sonner";

interface SubmitListingResponse {
  id: string;
  message: string;
}

interface SubmitListingInput {
  images: string[];
  title: string;
  description: string;
  price: string;
  category: string;
}

export const submitListing = async (images: string[], title: string, description: string, price: string, category: string): Promise<string | null> => {
  const submitListingFunction = httpsCallable<SubmitListingInput, SubmitListingResponse>( functions,"submitListing");
  try {
    // calling cloud function
    const response = await submitListingFunction({
      images,
      title,
      description,
      price,
      category,
    });

    // return listing id if sucessful
    return response.data.id; 

  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred");
    }
    return null;
  }
};
