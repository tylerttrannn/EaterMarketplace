// SellerCard component
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SellerCardProps } from "@/types/types";

function SellerCard({ user, onlineStatus, photo  }: SellerCardProps) {
  return (
    <div className="flex">
      <Avatar className="w-19 h-19"> 
        <AvatarImage src={photo} className="w-19 h-19" /> 
        <AvatarFallback className="w-19 h-19">CN</AvatarFallback>
      </Avatar>

      <div>
        <h1 className="pl-4">{user}</h1>
        <p className="pl-4 text-xs">Last Online: {onlineStatus}</p>
      </div>
    </div>
  );
}

export default SellerCard;
