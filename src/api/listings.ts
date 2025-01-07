import {  httpsCallable } from "firebase/functions";
import {functions} from "../../firebase"


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

    return response.data.id; // Return the listing ID

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error submitting listing:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
    return null;
  }
};
