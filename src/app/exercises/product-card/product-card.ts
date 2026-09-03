import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/core/services/products.service';
import { productwithquantity} from '../../core/core/models/product.model';


@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './products.html',
})
export class Products implements OnInit {
  private productsService = inject(ProductsService);
  products = signal<productwithquantity[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (response) => {
        this.products.set(
          response.products.map((product) => ({
            ...product,
            quantity: product.quantity ?? 0,
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


  increase(product: productwithquantity): void {
    if (product.quantity < 10) {
      product.quantity++;
      this.products.update((items) => [...items]);
    }
  }

  decrease(product: productwithquantity): void {
    if (product.quantity > 0) {
      product.quantity--;
      this.products.update((items) => [...items]);
    }
  }

}
