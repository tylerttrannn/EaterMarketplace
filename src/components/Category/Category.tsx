import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"



function Category(){

    return(
        <div className = "flex flex-col">
            <div className = "flex justify-center items-center space-x-4 px-4 pt-2">
                <Button variant="outline">Clothes</Button>
                <Button variant="outline">Electonics</Button>
                <Button variant="outline">Furniture</Button>
                <Button variant="outline">Services</Button>
                <Button variant="outline">Other</Button>
                <Button variant="outline">Free</Button>
                <Button variant="outline">Requests</Button>
                
            </div>
            <Separator className="mt-2" />
        </div>

    )

}


export default Category; 
