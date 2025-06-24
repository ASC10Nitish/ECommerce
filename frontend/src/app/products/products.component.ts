import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Products } from '../model/products.model';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../Service/Product.Service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { CartService } from '../Service/Cart.Service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterOutlet],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productForm!:FormGroup
  productList:Products[]=[]


  alertMessage = '';
  showAlert = false;

  constructor(private productService:ProductService,private formBuilder:FormBuilder,private router:Router,private cartService:CartService,private cdr: ChangeDetectorRef){}
  ngOnInit():void{ 
    this.productForm=this.formBuilder.group({
      productId: [],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]]

    })
    this.loadProducts();
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

  loadProducts()
  { 
    this.productService.getAllProducts().subscribe(response=>{this.productList=response})
  }

  AddProduct()
  { 
    const product=this.productForm.value;
    this.productService.createProduct(product).subscribe(response=>{console.log("Product added",response);
      this.loadProducts();
    this.productForm.reset();
    this.triggerAlert('Product Added ');
    },
  error=>{console.log("Unale to add product"),error });
    
  }

  addToCart(product: Products) {
    this.cartService.addProductToCart(product).subscribe({
      next: (response) => {
        this.triggerAlert('Product added to cart successfully');
        console.log('Product added to cart successfully', response);
      },
      error: (error) => {
        console.error('Failed to add product to cart', error);
      }
    });
  }
  

  viewCart() {
    this.router.navigate(['/cart']); 
  }

  navigateToLogin()
  { 
    this.router.navigate(['/']);
  }


}



