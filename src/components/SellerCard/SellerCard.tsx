import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button";



function SellerCard(){
    return(
        <div className = "flex "  >
            <Avatar>
                <AvatarImage src="https://bpb-us-e2.wpmucdn.com/sites.oit.uci.edu/dist/c/2/files/2022/07/R22_OIT_ProfessorAnteaterfortheOITHomepage_Icon_1000x1000.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            
            <div>
                <h1 className = "pl-4"> Petr the Anteater</h1>
                <p className = "pl-4 text-xs"> Last online Today</p>
            </div>

        </div>
    )
}


export default SellerCard;