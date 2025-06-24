import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../model/products.model';
import { CartItem } from '../model/CartItem.model';
import { Orders } from '../model/Orders.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUrl = 'http://localhost:8083/cart'; 
  private orderUrl='http://localhost:8084/orders';

  constructor(private http: HttpClient) { }


  addProductToCart(product: Products): Observable<any> {
    return this.http.post<Products>('http://localhost:8083/cart/add', product);
  }
  

 
  getCartProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.cartUrl);
  }

  deleteById(productId:number)
  { 
    return this.http.delete<Products>(`${this.cartUrl}/${productId}`);
  }


  placeOrder(products: Products[]): Observable<Orders> {
      return this.http.post<Orders>(`${this.orderUrl}/place`, products);
    }

  
}
