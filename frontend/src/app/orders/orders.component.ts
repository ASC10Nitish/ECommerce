// // src/app/orders/orders.component.ts
// import { Component, OnInit } from '@angular/core';
// import { OrdersService } from '../Service/Orders.service';
// import { Products } from '../model/products.model';
// import { Orders } from '../model/Orders.model';
// import { CartService } from '../Service/Cart.Service';
// import { CommonModule } from '@angular/common';
// import { Route, Router } from '@angular/router';

// @Component({
//   selector: 'app-orders',
//   standalone:true,
//   templateUrl: './orders.component.html',
//   styleUrls: ['./orders.component.css'],
//   imports:[CommonModule]
// })
// export class OrdersComponent implements OnInit {

//   cartItems: Products[] = [];
//   totalPrice: number = 0;
//   orderPlaced: boolean = false;
//   currentOrder?: Orders;

//   constructor(
//     private cartService: CartService,
//     private ordersService: OrdersService,
//     private router:Router
//   ) {}

//   ngOnInit(): void {
//     this.loadCartProducts();
//   }

//   loadCartProducts(): void {
//     this.cartService.getCartProducts().subscribe({
//       next: (items) => {
//         this.cartItems = items;
//         this.calculateTotalPrice();
//         this.placeOrder();
//       },
//       error: (err) => {
//         console.error('Error loading cart products:', err);
//       }
//     });
//   }

//   calculateTotalPrice(): void {
//     this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price, 0);
//   }


//   placeOrder(): void {
//     this.ordersService.placeOrder(this.cartItems).subscribe({
//       next: (order) => {
//         this.orderPlaced = true;
//         this.currentOrder = order;
//         alert('Order placed successfully! Order ID: ' + order.orderId);
//       },
//       error: (err) => {
//         console.error('Order placement failed:', err);
//         alert('Failed to place order.');
//       }
//     });
//   }
  

//   navigateToCart()
//   { 
//     return this.router.navigate(['/cart']);
//   }

//   cancelOrder(): void {
//     if (this.currentOrder) {
//       this.ordersService.cancelOrder(this.currentOrder.orderId).subscribe({
//         next: () => {
//           this.orderPlaced = false;
//           alert('Order cancelled.');
//           this.loadCartProducts(); // Refresh the cart
//         },
//         error: (err) => {
//           console.error('Order cancellation failed:', err);
//         }
//       });
//     }
//   }
// }











// src/app/orders/orders.component.ts
import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { OrdersService } from '../Service/Orders.service';
import { Products } from '../model/products.model';
import { Orders } from '../model/Orders.model';
import { CartService } from '../Service/Cart.Service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [CommonModule]
})
export class OrdersComponent implements OnInit {

  cartItems: Products[] = [];
  totalPrice: number = 0;
  orderPlaced: boolean = false;
  currentOrder?: Orders;

  alertMessage = '';
  showAlert = false;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCartProducts();
    this.placeOrder();
    this.fetchCurrentOrder(); // Fetch if order is already placed
  }

  loadCartProducts(): void {
    this.cartService.getCartProducts().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotalPrice();
      },
      error: (err) => {
        console.error('Error loading cart products:', err);
      }
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  triggerAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.showAlert = false;
      this.cdr.detectChanges();
    }, 1200);
  }
  // placeOrder()
  // { 
  //  this.ordersService.placeOrder(this.cartItems).subscribe(response=>response);
  // }

  placeOrder(): void {
    const productsToSend = this.cartItems.map(item => ({
      productId: item.productId
    }));
  
    this.ordersService.placeOrder(productsToSend).subscribe(order => {
      console.log("✅ Order placed successfully:", order);
    }, error => {
      console.error("❌ Order failed:", error);
    });
  }
  

  fetchCurrentOrder(): void {
    this.ordersService.getCurrentOrder().subscribe({
      next: (order) => {
        if (order) {
          this.orderPlaced = true;
          this.currentOrder = order;
        }
      },
      error: (err) => {
        console.error('Error fetching current order:', err);
      }
    });
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  cancelOrder(): void {
    if (this.currentOrder) {
      this.ordersService.cancelOrder(this.currentOrder.orderId).subscribe({
        next: () => {
          this.orderPlaced = false;
          this.currentOrder = undefined;
          this.triggerAlert('Order Cancelled ');
          this.loadCartProducts(); 
        },
        error: (err) => {
          console.error('Order cancellation failed:', err);
          this.triggerAlert('Failed to Cancel Order');
        }
      });
    }
  }
}
