import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import { getOtherUserInfo } from "../../../Backend/chatbox";
import { SellerCardProps } from "@/types/types";



interface ChatboxHeaderProps {
  conversationID: string;
}


function ChatboxHeader({ conversationID } : ChatboxHeaderProps ) {
  const [seller, setSeller] = useState<SellerCardProps | null>(null);

  useEffect(() => {
    async function getUser() {
      const response = await getOtherUserInfo(conversationID);
      console.log("response is ", response)

      if (response) {
        setSeller(response);
      } else {
        setSeller(null);
      }
    }

    getUser();
  }, [conversationID]);

  if (!seller) {
    return <h1> test</h1>; 
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row items-center space-x-4 ml-4 mt-4">
        <div>
          <Avatar>
            <AvatarImage src={seller.photo} />
            <AvatarFallback>cn</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col">
          <h1>{seller.user}</h1>
          <p className="text-xs">{seller.onlineStatus}</p>
        </div>
      </div>

      <Separator orientation="horizontal" className="w-full h-[1px] bg-gray-300" />
    </div>
  );
}

export default ChatboxHeader;
