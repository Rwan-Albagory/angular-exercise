import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/core/services/products.service';
import { productwithquantity} from '../../core/core/models/product.model';


@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './products.html',
})
export class Products implements OnInit {
  private productsService = inject(ProductsService);
  products: productwithquantity[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (response) => {
        this.products = response.products;
        this.loading = false;
      },
      error: ( ) => {
        this.error = 'Failed to load products.';
        this.loading = false;
      }
    });
  }


  increase(product: productwithquantity): void {
    if (product.quantity < 10) {
      product.quantity++;
      console.log('Quantity:', this.products);
    }
  }

  decrease(product: productwithquantity): void {
    if (product.quantity > 0) {
      product.quantity--;
      console.log('Quantity:', this.products);
    }
  }

}
