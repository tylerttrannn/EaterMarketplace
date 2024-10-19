import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import { getConversation , getOtherUserInfo} from  '../../../Backend/chatbox';

function ChatboxHeader() {



  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row items-center space-x-4 ml-4 mt-4">
        <div>

          <Avatar>
            <AvatarImage src="https://bpb-us-e2.wpmucdn.com/sites.oit.uci.edu/dist/c/2/files/2022/07/R22_OIT_ProfessorAnteaterfortheOITHomepage_Icon_1000x1000.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col">
          <h1>Petr Anteater</h1>
          <p className="text-xs">Last Active Yesterday</p>
        </div>
      </div>

      <Separator orientation="horizontal" className="w-full h-[1px] bg-gray-300" />
    </div>
  );
}

export default ChatboxHeader;
