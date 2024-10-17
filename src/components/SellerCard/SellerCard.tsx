import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SellerCardProps } from "@/types/types";



function SellerCard({ user, onlineStatus }: SellerCardProps) {
  return (
    <div className="flex">
      <Avatar>
        <AvatarImage src="https://bpb-us-e2.wpmucdn.com/sites.oit.uci.edu/dist/c/2/files/2022/07/R22_OIT_ProfessorAnteaterfortheOITHomepage_Icon_1000x1000.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div>
        <h1 className="pl-4">{user}</h1>
        <p className="pl-4 text-xs">Last Online: {onlineStatus}</p>
      </div>
    </div>
  );
}

export default SellerCard;
