// src/app/model/orders.model.ts
import { Products } from './products.model';

export interface Orders {
  orderId: number;
  products: Products[];
  totalPrice: number;
  orderDate: string;
  cancelled: boolean;
}
