import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/core/services/products.service';
import { ProductWithQuantity} from '../../core/core/models/product.model';
import { CartService } from '../../core/core/services/cart.service';

@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './products.html',
})
export class Products implements OnInit { 

  private productsService = inject(ProductsService);
  products = signal<ProductWithQuantity[]>([]);
  loading = signal(true);
  error = signal('');

  private cartService = inject(CartService);
  addToCart(product: ProductWithQuantity): void {
    this.cartService.addToCart(product);
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (response) => {
        this.products.set(
          //loop through the products and add the quantity from the cart service to each product
          response.products.map((product) => ({
            ...product,
            quantity: this.cartService.getQuantity(product.id),
          }))
        );
      },
      error: ( ) => {
        this.error.set('Failed to load products.');
      },
      complete : () => {
        this.loading.set(false);
      }
    });
  }


  increase(product: ProductWithQuantity): void {
    if (product.quantity < 10) {
      product.quantity++;
      //tell Angular to update the products signal so that the UI updates
      this.products.update((items) => [...items]);
    }
  }

  decrease(product: ProductWithQuantity): void {
    if (product.quantity > 0) {
      product.quantity--;
      this.products.update((items) => [...items]);
    }
  }

}
