import { ChatBubble, ChatBubbleMessage, ChatBubbleAvatar } from '../ui/chat/chat-bubble';
import { ChatMessageList } from '../ui/chat/chat-message-list';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { getMessages, sendMessage } from '../../../Backend/chatbox';
import { useEffect, useState } from 'react';
import { Message } from '@/types/types';
import { getAuth } from 'firebase/auth';
import { Button } from '../ui/button';
import ChatboxHeader from './chatboxHeader';
import ChatboxNavbar from './chatboxNavbar';

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

  return (
    <div className="flex flex-row">
      {/* Navbar section */}
      <ChatboxNavbar updateconvo={updateconvo} />
      {/* Chatbox section */}
      <div className="flex flex-col w-screen h-screen">
        {/* Chatbox header section */}
        <ChatboxHeader />
        {/* Messages */}
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
        {/* Input */}
        <div className="flex items-center space-x-4 pr-4 ml-4 mb-4">
          <ChatInput
            placeholder="Type your message here..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <Button onClick={() => sendMessage(text, conversationID)}>Send</Button>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
