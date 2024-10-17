export interface SellerCardProps {
    user: string;
    onlineStatus: string;
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