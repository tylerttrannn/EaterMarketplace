import { Message, SellerCardProps } from '../../src/types/types';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getDoc,  getDocs,  onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { grabSellerInfo } from './user';
import { toast } from 'sonner';


function generateConversationId(userId1 :string , userId2:string) {
  return [userId1, userId2].sort().join('_');
}

export const createConversation = async (sellerId: string): Promise<boolean> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User is not authenticated!");
    return false;
  }

  try {
    const conversationsRef = collection(db, "conversations");
    // generating id with given user and seller 
    const participantIds = generateConversationId(user.uid, sellerId);

    // query to check if a conversation between the two exists
    const q = query(conversationsRef, where('participantIds', '==', participantIds));
    const querySnapshot = await getDocs(q);

    // dont create a conversation 
    if (!querySnapshot.empty) {
      toast.error("Conversation already exists!");

      return false; 
    }

    await addDoc(conversationsRef, {
      participants: [user.uid, sellerId],
      participantIds: participantIds,
      createdAt: new Date(),
    });

    console.log("Conversation created successfully");
    return true;

  } catch (error) {
    console.error("Error creating conversation:", error);
    return false;
  }
};


export const getIDs = async (conversationID: string): Promise<string[] | null> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error('User is not authenticated!');
    return null;
  }

  try {
    // Get the document for the specific conversationID
    const conversationDocRef = doc(collection(db, 'conversations'), conversationID);
    const conversationDoc = await getDoc(conversationDocRef);

    if (!conversationDoc.exists()) {
      console.log('No conversation found for the given ID');
      return [];
    }

    const conversationData = conversationDoc.data();

    if (!conversationData || !conversationData.participants) {
      console.log('Participants field is missing in the conversation document');
      return [];
    }

    const participantIds: string[] = conversationData.participants;

    return participantIds;
  } catch (error) {
    console.error('Could not retrieve conversation participants', error);
    return null;
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


  export const getConversations = async (): Promise<string[] | null> => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      console.error('User is not authenticated!');
      return null;
    }
  
    try {
      // checking whole message collection and checking if the participants array contains the user id 
      const conversationsRef = collection(db, 'conversations');
      const q = query(conversationsRef, where('participants', 'array-contains', user.uid));
  
      const querySnapshot = await getDocs(q);
      const conversationIds = querySnapshot.docs.map(doc => doc.id);
  
      if (conversationIds.length === 0) {
        console.log('No conversations found');
        return [];
      }
  
      return conversationIds;
    } catch (error) {
      console.error('Could not retrieve conversations', error);
      return null;
    }
  };



  export const getOtherUserInfo = async (
    conversationID: string
  ): Promise<SellerCardProps | null> => {
    try {
      console.log('getOtherUserInfo called with conversationID:', conversationID);

      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        console.error("User is not authenticated!");
        return null;
      }
  
      const currentUserID = user.uid;
  
      // Fetch the conversation document
      const convoRef = doc(db, "conversations", conversationID);
      const convoSnap = await getDoc(convoRef);
  
      if (!convoSnap.exists()) {
        console.log("Conversation not found");
        return null;
      }
  
      const data = convoSnap.data();
  
      if (!data?.participants || !Array.isArray(data.participants)) {
        console.log("Participants not found");
        return null;
      }
  
      // Filtering current user's ID
      const otherUserID = data.participants.find(
        (userID: string) => userID !== currentUserID
      );
  
      if (!otherUserID) {
        console.log("Other participant not found");
        return null;
      }
  
      // Grabbing other user's info
      const otherUserInfo = await grabSellerInfo(otherUserID);
  
      return otherUserInfo;
    } catch (error) {
      console.error("Error fetching other user info:", error);
      return null;
    }
  };