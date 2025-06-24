import { ChangeDetectorRef,Component } from '@angular/core';
import { CartService } from '../Service/Cart.Service';
import { Products } from '../model/products.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from '../orders/orders.component';
import { Router } from '@angular/router';
import { OrdersService } from '../Service/Orders.service';
import { Orders } from '../model/Orders.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems:Products[]=[];
  orderPlaced: boolean = false;
  currentOrder?: Orders;

  alertMessage = '';
  showAlert = false;

  constructor(private cartService:CartService,private router:Router,private orderService:OrdersService,private cdr:ChangeDetectorRef){}


  ngOnInit(): void {
    this.cartService.getCartProducts().subscribe(response => {
      this.cartItems = response;
    });
  }

  // addToCart(productId: number): void {
  //   this.cartService.addProductToCart(productId).subscribe({
  //     next: (response) => {
  //       console.log('Product added successfully:', response.message);
  //     },
  //     error: (error) => {
  //       console.error('Error adding product to cart:', error);
  //     }
  //   });
  // }

  triggerAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.showAlert = false;
      this.cdr.detectChanges();
    }, 1200);
  }

  addToCart(product: Products): void {
    this.cartService.addProductToCart(product).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
      }
    });
  }
  

  removeFromCart(productId:number)
  { 
    this.cartService.deleteById(productId).subscribe(response=>{this.cartItems=this.cartItems.filter(product=>product.productId!=productId)})
  }
  

  navigateToOrders() {
    this.triggerAlert('order placed successfully');
    setTimeout(() => {
      this.router.navigate(['/orders']);
    }, 1000); 
  }
  

  navigateToProducts()
  { 
    return this.router.navigate(['/products']);
  }

  

}











