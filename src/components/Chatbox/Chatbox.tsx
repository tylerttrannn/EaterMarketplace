import { useEffect, useRef, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { ChatBubble, ChatBubbleMessage, ChatBubbleAvatar } from '../ui/chat/chat-bubble';
import { ChatMessageList } from '../ui/chat/chat-message-list';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { Button } from '../ui/button';
import Navbar from '../Navbar/Navbar';
import ChatboxNavbar from './chatboxNavbar';
import ChatboxHeader from './chatboxHeader';
import { getIDs, getMessages, sendMessage } from '../../../Backend/chatbox';
import {  grabUserProfilePic } from '../../../Backend/user';
import { toast } from 'sonner';
import { Message } from '@/types/types';

function Chatbox() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [conversationID, setConversationID] = useState('');
  const [text, setText] = useState('');
  const [userProfilePic, setUserProfilePic] = useState<string | null>(null);
  const [otherUserProfilePic, setOtherUserProfilePic] = useState<string | null>(null);

  const auth = getAuth();
  const user = auth.currentUser;
  const currentUserID = user ? user.uid : '';

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Fetch participant IDs and profile pictures
  useEffect(() => {
    async function fetchProfilePics() {
      if (!conversationID) return;

      const ids = await getIDs(conversationID);
      if (!ids || ids.length < 2 || !user) return;

      try {
        // Assign profile pictures
        const userIndex = ids.indexOf(currentUserID);
        const otherUserIndex = userIndex === 0 ? 1 : 0;

        const userPic = await grabUserProfilePic(ids[userIndex]);
        const otherUserPic = await grabUserProfilePic(ids[otherUserIndex]);

        setUserProfilePic(userPic);
        setOtherUserProfilePic(otherUserPic);
      } catch (error) {
        console.error('Error fetching profile pictures:', error);
      }
    }

    fetchProfilePics();
  }, [conversationID, currentUserID, user]);

  // Fetch messages
  useEffect(() => {
    if (!conversationID) return;

    const unsubscribe = getMessages(conversationID, (messages: Message[]) => {
      setConversation(messages);
    });

    return () => {
      unsubscribe();
    };
  }, [conversationID]);

  // Scroll to bottom on conversation update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSendMessage = () => {
    if (text.trim() === '') return;

    if (text.length > 200) {
      toast.error('Message is too long to send');
      return;
    }

    if (!/^[\x20-\x7E]*$/.test(text)) {
      toast.error('Please use normal characters');
      return;
    }

    sendMessage(text, conversationID);
    setText('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    return <div>Please log in to view your messages.</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row flex-1 overflow-hidden">
        <ChatboxNavbar updateconvo={setConversationID} />
        <div className="flex flex-col flex-1">
          <div className="flex-1 overflow-y-auto max-w-full overflow-x-hidden" ref={chatContainerRef}>
            <ChatboxHeader conversationID={conversationID} />
            <div className="w-full px-4">
              <ChatMessageList>
                {conversation.map((message) => (
                  <ChatBubble key={message.id} variant={message.messengerID === currentUserID ? 'sent' : 'received'}>
                    <ChatBubbleAvatar
                      src={
                        message.messengerID === currentUserID
                          ? userProfilePic || undefined
                          : otherUserProfilePic || undefined
                      }
                      fallback="US"
                    />
                    <ChatBubbleMessage variant={message.messengerID === currentUserID ? 'sent' : 'received'}>
                      {message.msg}
                    </ChatBubbleMessage>
                  </ChatBubble>
                ))}
              </ChatMessageList>
            </div>
          </div>
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
