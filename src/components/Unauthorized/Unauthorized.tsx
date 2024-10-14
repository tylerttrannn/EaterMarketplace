
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
  

function Unauthorized(){
    const navigate = useNavigate();
    return(
        <Dialog open = {true}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>You are not authorized to login</DialogTitle>
            <DialogDescription>
                Please login via the Frontpage
            </DialogDescription>
            <Button onClick = {() => navigate('/')}> Navigate to Frontpage</Button>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
}


export default Unauthorized;
