import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Products } from "../model/products.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class ProductService{

    baseUrl:string="http://localhost:8082/products";

    constructor(private httpClient:HttpClient){}

    getAllProducts()
    { 
        return this.httpClient.get<Products[]>(this.baseUrl);
    }

    createProduct(product:Products)
    { 
        return this.httpClient.post<Products>(this.baseUrl,product);
    }

    addProductToCart(product: Products): Observable<any> {
        return this.httpClient.post<any>('http://localhost:8083/cart/add', product);
      }
      
}