import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {  useNavigate } from "react-router-dom";


function Category(){
    const navigate = useNavigate();

    return(
        <div className = "flex flex-col">
            <div className = "flex justify-center items-center space-x-4 px-4 pt-2">
                <Button variant="outline" onClick= {() => navigate('/category/clothes')}>Clothes</Button>
                <Button variant="outline" onClick= {() => navigate('/category/electronics')}>Electonics</Button>
                <Button variant="outline" onClick= {() => navigate('/category/furniture')}>Furniture </Button>
                <Button variant="outline" onClick= {() => navigate('/category/services')}>Services</Button>
                <Button variant="outline" onClick= {() => navigate('/category/other')}>Other</Button>
                <Button variant="outline" onClick= {() => navigate('/category/free')}>Free</Button>
                <Button variant="outline" onClick= {() => navigate('/category/requests')}>Requests</Button>
            </div>
            <Separator className="mt-2" />
        </div>

    )

}


export default Category; 
