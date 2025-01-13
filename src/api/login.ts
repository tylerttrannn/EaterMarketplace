import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase";
import { GoogleLogin } from "../../functions/src/auth"


type UpdateUsernameResponse = {
  success: boolean;
  message: string;
};

export const updateUsername = async (username: string): Promise<boolean> => {
  // in httpscallable first argument is the input, second is the response 
  const updateFunction = httpsCallable<{ username: string }, UpdateUsernameResponse>(functions, "updateUsername");

  try {
    // Call the Cloud Function
    const response = await updateFunction({ username });

    const data = response.data;

    if (data.success) {
      console.log(data.message);
      return true;
    } else {
      console.error("Failed to update username:", data.message);
      return false;
    }
  } catch (error) {
    console.error("Error updating username:", error);
    return false;
  }
};

export const login = async (): Promise<{ success: boolean; isUsernameEmpty: boolean }> => {
  try {
    const { user, isUsernameEmpty } = await GoogleLogin();

    if (!user) {
      throw new Error("Google login failed");
    }

    return { success: true, isUsernameEmpty };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, isUsernameEmpty: false };
  }
};
