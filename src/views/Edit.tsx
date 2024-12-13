import Navbar from "@/components/Navbar/Navbar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchSingleListing } from "../../Backend/listings";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Backend/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";



import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"



function Edit() {
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [pid, setPid] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [currentUser, setCurrentUser] = useState<User>();
    const [showDialog, setShowDialog] = useState(false);

    const auth = getAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // fetching current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user);
        } else {
            toast.error("You need to log in to edit this listing.");
            navigate("/login"); 
        }
        });
        return () => unsubscribe();
    }, [auth, navigate]);

    async function retrieveListing() {
        if (!id) {
            console.error("ID is undefined");
            return;
        }
        try {
            const output = await fetchSingleListing(id);
            if (output) {
                const { uid, title, price, description, category = "", image } = output;

                if (currentUser?.uid !== uid) {
                    toast.error("You are not authorized to edit this listing.");
                    navigate("/"); 
                    return;
                }
                setTitle(title || "");
                setPrice(price?.toString() || "");
                setDescription(description || "");
                setCategory(category);
                setPid(uid);
                setImages(image || []);
            }
        } 
        catch (error) {
            console.error("Failed to fetch listing", error);
        }
    }

    useEffect(() => {
        if (currentUser) {
        retrieveListing();
        }
    }, [currentUser]);

    async function deleteListing() {

        if (!currentUser || currentUser.uid !== pid) {
            toast.error("You are not authorized to delete this listing.");
            return;
        }

        try {
            const docRef = doc(db, "posts", id!);
            await deleteDoc(docRef);

            toast.success("Listing Sucessfully Deleted!");
            navigate(`/dashboard`);
        } 
        catch (error) {
            toast.error("Failed to delete the listing");
            console.error(error);
        }

     }

    async function submitListing() {
        if (!currentUser || currentUser.uid !== pid) {
            toast.error("You are not authorized to edit this listing.");
            return;
        }

        function isNormalCharacter(text: string) {
          console.log("not normal text");
          return /^[\x20-\x7E\n\r]*$/.test(text);
        }
        
      
        const validationErrors = [
          { condition: title === "", message: "Please include a title" },
          { condition: title.length > 50, message: "Please keep your title under 50 characters" },
          { condition: !isNormalCharacter(title), message: "Please use only printable ASCII characters in the title" },
          { condition: description === "", message: "Please include a description" },
          { condition: !isNormalCharacter(description), message: "Please use only printable ASCII characters in the description" },
          { condition: description.length > 200, message: "Please shorten your description" },
          { condition: category === "", message: "Please select a category!" },
        ];
        
        for (const { condition, message } of validationErrors) {
            if (condition) {
                toast.error(message);
                return;
            }
        }

        const itemPrice = price === "" ? 0 : Number(price);

        try {
            const docRef = doc(db, "posts", id!);
            await updateDoc(docRef, {
                title,
                price: itemPrice,
                description,
                category,
                images,
            });



            toast.success("Item Listing Updated!");
            navigate(`/listing/${id}`);
        } 
        catch (error) {
            toast.error("Failed to update the listing");
            console.error(error);
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
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full gap-6 pt-5">
          {/* list item headings */}
          <h1 className = "text-3xl">Edit Your Item</h1>

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
                  type="text" // Use text type to allow empty string and numeric input
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="$0.00"
                  className="pr-8"
                />
              </div>
            </div>
  
          <div className="flex justify-end w-full max-w-2xl space-x-2">
            <Button variant="outline" onClick = {() => setShowDialog(true)}>Delete</Button>
            <Button variant="outline" onClick = {() => submitListing()}>Submit</Button>
          </div>

          <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                listing and remove it from our servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowDialog(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteListing()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    )
    
}

export default Edit;