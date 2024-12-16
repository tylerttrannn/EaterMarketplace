import { Button } from "@/components/ui/button";
import { GoogleLogin, updateUsername } from "../../Backend/auth";
import { useState } from "react";
import { User } from "firebase/auth";
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

function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [username, setUsername] = useState("");
  const [drawer, setDrawer] = useState(false);

  const handleLogin = async () => {
    try {
      const result = await GoogleLogin();

      if (result?.user) {
        setUser(result.user);
        setIsUsernameEmpty(result.isUsernameEmpty);

        if (result.isUsernameEmpty) {
          setDrawer(true);
          return;
        }

        toast("Login Successful!");
      } else {
        toast.error("Login failed: No user data returned.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error("Login error:", error);
    }
  };

  const handleUsernameSubmit = async () => {
    if (user) {
      const success = await updateUsername(user, username);
      if (success) {
        toast("Username updated successfully!");
      }
    }
    setDrawer(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Card className="max-w-md w-full shadow-md">
        <CardHeader>
          <CardTitle>Login with your UCI Email!</CardTitle>
          <CardDescription>
            Currently, this app is only available for current Anteaters. If you'd
            like to request access for your school, send a request here.
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

      {/* Drawer for Username Input */}
      {isUsernameEmpty && (
        <Drawer open={drawer} onOpenChange={setDrawer}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Set Your Username</DrawerTitle>
              <DrawerDescription>Enter a username to complete your profile</DrawerDescription>
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
