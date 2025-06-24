export interface CartItem {
    id: number;         // Unique cart item ID
    userId: number;     // User who added this item
    productId: number;  // ID of the product
    name: string;
    description: string;
    category: string;
    price: number;
  }
  