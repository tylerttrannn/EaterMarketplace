import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



function Navbar(){
    return (
        <div className = "flex flex-row ml-2 h-screen ">
            {/* left side navbar*/}
            <div className="flex flex-col space-y-4 w-[25px] sm:w-4/5">
                {/* header*/}
                <div className = "ml-2 mt-4 mb-4">
                    <h1 className = "text-3xl hidden sm:block"> Chats</h1>
                </div>

                {/*/ user section  */}
                <div className="flex flex-col justify-center space-y-4 ml-4">
                    <div className="p-2 hover:shadow-2xl hover:bg-[#f4f4f5] rounded-lg transition-shadow duration-300">
                        <div className="flex flex-row items-center space-x-4">
                            <Avatar>
                                <AvatarImage src="https://bpb-us-e2.wpmucdn.com/sites.oit.uci.edu/dist/c/2/files/2022/07/R22_OIT_ProfessorAnteaterfortheOITHomepage_Icon_1000x1000.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h1 className="hidden sm:block">Petr Anteater</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/*/  right side */}
            <div className = "ml-12">
                <Separator orientation="vertical" className="h-full w-[1px] bg-gray-300" />
            </div>




        </div>
    )


}


export default Navbar;