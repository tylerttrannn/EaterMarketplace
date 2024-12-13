import { ChatBubble, ChatBubbleMessage, ChatBubbleAvatar } from '../ui/chat/chat-bubble';
import { ChatMessageList } from '../ui/chat/chat-message-list';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { getMessages, sendMessage } from '../../../Backend/chatbox';
import { useEffect, useState } from 'react';
import { Message } from '@/types/types';
import { getAuth } from 'firebase/auth';
import { Button } from '../ui/button';
import ChatboxNavbar from './chatboxNavbar';
import Navbar from '../Navbar/Navbar';
import { toast } from "sonner";


function Chatbox() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [conversationID, setConversationID] = useState('');
  const [text, setText] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;
  const currentUserID = user ? user.uid : '';

  useEffect(() => {
    if (!conversationID) return;

    const unsubscribe = getMessages(conversationID, (messages: Message[]) => {
      setConversation(messages);
    });

    return () => {
      unsubscribe();
    };
  }, [conversationID]);

  if (!user) {
    return <div>Please log in to view your messages.</div>;
  }

  function updateconvo(id: string) {
    setConversationID(id);
  }
  function isNormalCharacter(text: string) {
    return /^[\x20-\x7E]*$/.test(text);
  }

  const handleSendMessage = () => {
    if (text.trim() === '') return; // to disallow empty inputs 

    if (text.length > 200){
      toast.error("Message is too long to send")
      return; 
    }
    if (!isNormalCharacter(text)){
      toast.error("Please use normal Characters")
      return; 

    }
    sendMessage(text, conversationID);
    setText(''); // clearing the input
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // stops default behavior 
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row flex-1 overflow-hidden">
        {/* Navbar section */}
        <ChatboxNavbar updateconvo={updateconvo} />
        {/* Chatbox section */}
        <div className="flex flex-col flex-1">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            <ChatMessageList>
              {conversation.map((message) => (
                <ChatBubble
                  key={message.id}
                  variant={message.messengerID === currentUserID ? 'sent' : 'received'}
                >
                  <ChatBubbleAvatar fallback="US" />
                  <ChatBubbleMessage
                    variant={message.messengerID === currentUserID ? 'sent' : 'received'}
                  >
                    {message.msg}
                  </ChatBubbleMessage>
                </ChatBubble>
              ))}
            </ChatMessageList>
          </div>
          {/* Input */}
          <div className="flex items-center space-x-4 p-4">
            <ChatInput
              placeholder="Type your message here..."
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
