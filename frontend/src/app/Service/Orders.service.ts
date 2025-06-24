// src/app/Service/orders.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../model/products.model';
import { Orders } from '../model/Orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orderUrl = 'http://localhost:8084/orders';

  constructor(private http: HttpClient) {}

//   placeOrder(cartItems: Products[]): Observable<Orders> {
//     return this.http.post<Orders>(`${this.orderUrl}/place`, cartItems);
//   }

placeOrder(cartItems: { productId: number }[]): Observable<Orders> {
    return this.http.post<Orders>(`${this.orderUrl}/place`, cartItems);
  }
  

  getAllOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.orderUrl);
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.orderUrl}/cancel/${orderId}`, { responseType: 'text' });
  }

  getCurrentOrder(): Observable<Orders> {
    return this.http.get<Orders>(`${this.orderUrl}/latest`);
  }
}
