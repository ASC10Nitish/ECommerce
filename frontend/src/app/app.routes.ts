import { provideRouter, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';

export const routes: Routes = [
    {path:'', component:LoginPageComponent},
    { path: 'products', component: ProductsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'orders', component: OrdersComponent }
];


export const appRoutingProviders = [provideRouter(routes)];