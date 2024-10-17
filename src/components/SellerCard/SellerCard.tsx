import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SellerCardProps } from "@/types/types";


function SellerCard({ user, onlineStatus, photo  }: SellerCardProps) {
  return (
    <div className="flex">
      <Avatar>
        <AvatarImage src={photo} />
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
