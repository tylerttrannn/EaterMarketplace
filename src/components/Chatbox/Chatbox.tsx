import { ChatBubble } from "../ui/chat/chat-bubble";
import { ChatMessageList } from "../ui/chat/chat-message-list";
import { ChatBubbleMessage } from "../ui/chat/chat-bubble";
import { ChatBubbleAvatar } from "../ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import ChatboxNavbar from "./chatboxNavbar"; 
import ChatboxHeader from "./chatboxHeader";

import { getConversation, sendMessage } from "../../../Backend/chatbox"
import { useEffect, useState } from "react";
import { Conversation } from "@/types/types";



function Chatbox(){

    const [conversation, setConversation] = useState<Conversation | undefined>(); // Set to undefined initially
    const [conversationID, setConversationID] = useState("6g8OjSDFqURo613xp7QGbJEzWrG2"); // Dynamically track conversation ID
  
     
    useEffect(() => {
      async function grabConversation() {
        const response = await getConversation(conversationID); // Use the dynamic conversationID
  
        if (response) {
          setConversation(response); // Update the conversation state with the response
        }
      }
  
      grabConversation(); // Call the async function within useEffect
    }, [conversationID]); // Runs the effect when conversationID changes
    

    console.log("chatbox");
    return(
        // Wrap with ChatMessageList
        <div className = "flex flex-row ">
            
            {/* navbar section */}
            <div>
                <ChatboxNavbar/>
            </div>

            {/* chatbox section */}
            <div className = "flex flex-col w-screen h-screen">
                {/* chatbox header section*/}
                <div>
                    <ChatboxHeader/>
                </div>

                <ChatMessageList>

                {conversation && (
                    <ChatBubble variant='sent'>
                        <ChatBubbleAvatar fallback='US' />
                        <ChatBubbleMessage variant='sent'>
                        Hello, how has your day been? I hope you are doing well.
                        </ChatBubbleMessage>
                    </ChatBubble>
                )}

                </ChatMessageList>
                <ChatInput placeholder="Type your message here..."/>
            </div>

        </div>

    )

}


export default Chatbox;