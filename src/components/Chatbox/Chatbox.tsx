import { ChatBubble } from "../ui/chat/chat-bubble";
import { ChatMessageList } from "../ui/chat/chat-message-list";
import { ChatBubbleMessage } from "../ui/chat/chat-bubble";
import { ChatBubbleAvatar } from "../ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import ChatboxNavbar from "./chatboxNavbar"; 
import ChatboxHeader from "./chatboxHeader";




function Chatbox(){

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
                <ChatBubble variant='sent'>
                    <ChatBubbleAvatar fallback='US' />
                    <ChatBubbleMessage variant='sent'>
                    Hello, how has your day been? I hope you are doing well.
                    </ChatBubbleMessage>
                </ChatBubble>

                <ChatBubble variant='received'>
                    <ChatBubbleAvatar fallback='AI' />
                    <ChatBubbleMessage variant='received'>
                    Hi, I am doing well, thank you for asking. How can I help you today?
                    </ChatBubbleMessage>
                </ChatBubble>


                <ChatBubble variant='sent'>
                    <ChatBubbleAvatar fallback='US' />
                    <ChatBubbleMessage variant='sent'>
                    Whats the lowest you could go for this?
                    </ChatBubbleMessage>
                </ChatBubble>

                <ChatBubble variant='received'>
                    <ChatBubbleAvatar fallback='AI' />
                    <ChatBubbleMessage isLoading />
                </ChatBubble>
                </ChatMessageList>


                <ChatInput placeholder="Type your message here..."/>
            </div>

        </div>

    )

}


export default Chatbox;