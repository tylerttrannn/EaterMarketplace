export interface SellerCardProps {
    user: string;
    onlineStatus: string;
    photo: string; 
};


export interface Listing {
    id: string; // Document ID
    uid: string; // User ID of the listing creator
    title: string; // Listing title
    image: string[]; // Arrays of the URL's of the imag e
    price: number; // Price of the item
    description: string; // Description of the item
    category?: string; // Category of the item 
    createdAt?: Date; // Timestamp of created date
}


export interface Conversation {
  id: string; 
  participants: string[]; 
  createdAt: Date; 
}

export interface Message {
  id: string;
  messengerID: string;
  createdAt: Date; 
  msg: string; 
}

// User.ts
export interface User {
  id: string; // Document ID (could be same as uid)
  uid: string; 
  userName: string;
  email: string;
  profilePic: string;
  lastLogin: Date;
  saved: Listing[];
  conversations?: string[]; 
}
