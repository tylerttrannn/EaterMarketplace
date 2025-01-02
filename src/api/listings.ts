import { getFunctions, httpsCallable } from "firebase/functions";

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
  // Initialize Firebase Functions
  const functions = getFunctions();

  // Define the callable function with input and output types
  const submitListingFunction = httpsCallable<SubmitListingInput, SubmitListingResponse>( functions,"submitListing");

  try {
    console.log("listings.ts start")
    // Call the Cloud Function with the input data
    const response = await submitListingFunction({
      images,
      title,
      description,
      price,
      category,
    });

    console.log(response.data.message); 
    return response.data.id; // Return the listing ID

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error submitting listing:", error.message);
      console.error("poopasdf");
    } else {
      console.error("An unexpected error occurred:", error);
    }
    return null;
  }
};
