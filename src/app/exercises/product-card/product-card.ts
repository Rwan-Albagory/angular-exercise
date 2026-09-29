import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/core/services/products.service';
import { ProductWithQuantity} from '../../core/core/models/product.model';
import { CartService } from '../../core/core/services/cart.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: 'products.html',
  imports: [RouterLink, DecimalPipe],
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

  private route = inject (ActivatedRoute);
  categorySlug = signal<string | null>(null);

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (response) => {
        this.products.set(
          response.map((product) => ({
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

    this.route.paramMap.subscribe(params =>{
      this.categorySlug.set(params.get('category'));
    });

  }

  filteredProducts = computed(() => {
    const category = this.categorySlug();
    const allProducts = this.products();

    if (!category) {
      return allProducts
    }
    return allProducts.filter(
      product => product.category === category
    );

  });

  pageTitle = computed(() => {
    const category = this.categorySlug();
    return category ? category.toUpperCase() : 'PRODUCTS';
  });



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
