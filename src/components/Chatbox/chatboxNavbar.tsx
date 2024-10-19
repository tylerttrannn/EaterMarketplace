import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getConversations, getOtherUserInfo } from '../../../Backend/chatbox';
import { useEffect, useState } from 'react';
import { SellerCardProps } from '@/types/types';

interface ConversationItem {
  conversationID: string;
  otherUserInfo: SellerCardProps;
}

interface ChatboxNavbarProps {
  updateconvo: (id: string) => void;
}

function ChatboxNavbar({ updateconvo }: ChatboxNavbarProps) {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [selectedConversationID, setSelectedConversationID] = useState<string | null>(null); 


  useEffect(() => {
    async function fetchConversations() {
      const res = await getConversations();
      if (res) {
        const conversationsWithUserInfo = await Promise.all(
          res.map(async (conversationID) => {
            const otherUserInfo = await getOtherUserInfo(conversationID);
            if (otherUserInfo) {
              return {
                conversationID,
                otherUserInfo,
              };
            } else {
              return null;
            }
          })
        );

        const filteredConversations = conversationsWithUserInfo.filter(
          (conversation) => conversation !== null
        ) as ConversationItem[];

        setConversations(filteredConversations);
      }
    }
    fetchConversations();
  }, []);

  const handleClick = (conversationID: string) => {
    setSelectedConversationID(conversationID); 
    updateconvo(conversationID); 
  };

  return (
    <div className="flex flex-row ml-2 h-screen">
      {/* Left side navbar */}
      <div className="flex flex-col space-y-4 ">
        {/* Header */}
        <div className="ml-2 mt-4 mb-4">
          <h1 className="text-3xl hidden sm:block">Chats</h1>
        </div>
        {/* User section */}
        <div className="flex flex-col justify-center space-y-4 ml-1">
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <div
                key={conversation.conversationID}
                className={`p-2 rounded-lg transition-shadow duration-300 ${
                  selectedConversationID === conversation.conversationID
                    ? 'shadow-1xl bg-[#f4f4f5]' // Apply shadow and background if selected
                    : 'hover:shadow-1xl hover:bg-[#f4f4f5]' // else no shadow with a hover
                }`}
                onClick={() => handleClick(conversation.conversationID)}  // update the selected conversation 
              >
                <div className="flex flex-row items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={conversation.otherUserInfo.photo} />
                    <AvatarFallback>
                      {conversation.otherUserInfo.user[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="hidden sm:block">
                    {conversation.otherUserInfo.user}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <div>Loading conversations...</div>
          )}
        </div>
      </div>
      {/* Right side */}
      <div className="ml-3">
        <Separator orientation="vertical" className="h-full w-[1px] bg-gray-300" />
      </div>
    </div>
  );
}

export default ChatboxNavbar;
