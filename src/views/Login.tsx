import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import Anteater from "../assets/anteater.png";
import { Separator } from "@radix-ui/react-separator";
import { useNavigate } from "react-router-dom";
import { login, updateUsername } from "../api/login";

function Login() {
  const [username, setUsername] = useState("");
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // api call 
      const result = await login();
  
      if (result.success) {
        console.log("Login successful!");
  
        if (result.isUsernameEmpty) {
          setIsUsernameEmpty(true);
          setDrawer(true); // Open the drawer to prompt for a username
        } else {
          navigate("/dashboard");
        }
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error("Login error:", error);
    }
  };
  
  const handleUsernameSubmit = async () => {
    console.log("Username submitted:", username);
    const response = await updateUsername(username);

    if (response) {
      toast.success("Username updated successfully!");
      setDrawer(false)
      navigate("/dashboard");
    } else {
      toast.error("Failed to update username.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Card className="max-w-md w-full shadow-md">
        <CardHeader>
          <CardTitle>Login with your UCI Email!</CardTitle>
          <CardDescription>
            Currently, this app is only available for current Anteaters. If you'd like to request
            access for your school, send a request here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <img src={Anteater} alt="Anteater" className="mx-auto mb-4 max-w-[150px]" />
          <Separator />
          <Button className="w-full mt-4" onClick={handleLogin}>
            Login with Google
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 text-center">
            By logging in, you agree to our terms and conditions.
          </p>
        </CardFooter>
      </Card>

      {isUsernameEmpty && (
        <Drawer open={drawer} onOpenChange={setDrawer}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Set Your Username</DrawerTitle>
              <DrawerDescription>
                Enter a username to complete your profile.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-6">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="mb-4"
              />
            </div>
            <DrawerFooter className="px-6">
              <Button className="w-full" onClick={handleUsernameSubmit}>
                Submit
              </Button>
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => setDrawer(false)}
              >
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}

export default Login;
