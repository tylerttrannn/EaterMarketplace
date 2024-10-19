import { Message } from '@/types/types';
import { db } from './firebase';
import { getAuth } from 'firebase/auth';
import { addDoc, arrayUnion, collection, doc, getDoc,  onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';

export const createConversation = async (sellerId: string): Promise<boolean> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User is not authenticated!");
    return false;
  }

  try {
    // Reference to the conversations collection
    const conversationsRef = collection(db, "conversations");

    // Add the conversation document with participants
    const conversationDoc = await addDoc(conversationsRef, {
      participants: [user.uid, sellerId],
      createdAt: new Date(),
    });

    // adding id to user 
    const conversationId = conversationDoc.id;
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      conversations: arrayUnion(conversationId),
    });

    console.log("Conversation created successfully");
    return true;

    
  } catch (error) {
    console.error("Error creating conversation:", error);
    return false;
  }
};


export const sendMessage = async (message: string, conversationID: string ): Promise<boolean> => {

    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      console.error('User is not authenticated!');
      return false;
    }
  
    try {
      const messagesRef = collection(db, 'conversations', conversationID, 'messages');
  
      await addDoc(messagesRef, {
        messengerID: user.uid,
        createdAt: new Date(),
        msg: message,
      });
  
      console.log('Message sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  };
  
  
  export const getMessages = (conversationID: string, callback: (messages: Message[]) => void): (() => void) => {
    const messagesRef = collection(db, 'conversations', conversationID, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages: Message[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          messengerID: data.messengerID,
          createdAt: data.createdAt.toDate(),
          msg: data.msg,
        };
      });
      callback(messages);
    });
  
    return unsubscribe;
  };

  