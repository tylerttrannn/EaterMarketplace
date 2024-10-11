import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"



function PhotoCard(){

    function uploadImage(){
        console.log("hello");
    }


    return(
        <div>
            <Card onClick = {() => uploadImage()} className= "hover:bg-sky-700">
                <CardHeader>
                    <CardTitle>Image 1</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    )



}


export default PhotoCard;