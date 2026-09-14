import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Product } from '../../core/core/models/product.model';
import { CartService } from '../../core/core/services/cart.service';
import { ProductsService } from '../../core/core/services/products.service';

@Component({
  standalone: true,
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  imports: [RouterLink, DatePipe, DecimalPipe],
})
export class ProductDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);

  product = signal<Product | null>(null);
  selectedImage = signal('');
  quantity = signal(1);
  loading = signal(true);
  error = signal('');
  addedToCart = signal(false);

  discountedPrice = computed(() => {
    const item = this.product();
    if (!item) {
      return 0;
    }
    return item.price * (1 - item.discountPercentage / 100);
  });

  gallery = computed(() => {
    const item = this.product();
    if (!item) {
      return [];
    }
    const images = item.images?.length ? item.images : [item.thumbnail];
    return [...new Set(images.filter(Boolean))];
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.selectedImage.set(product.thumbnail || product.images?.[0] || '');
        this.quantity.set(this.cartService.getQuantity(product.id) || 1);
      },
      error: () => {
        this.error.set('Could not load this product. Please try again.');
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  selectImage(image: string): void {
    this.selectedImage.set(image);
  }

  increase(): void {
    if (this.quantity() < 10) {
      this.quantity.update((value) => value + 1);
    }
  }

  decrease(): void {
    if (this.quantity() > 1) {
      this.quantity.update((value) => value - 1);
    }
  }

  addToCart(): void {
    const item = this.product();
    if (!item) {
      return;
    }

    this.cartService.addToCart({
      ...item,
      quantity: this.quantity(),
    });
    this.addedToCart.set(true);
  }

  starFill(index: number, rating = this.product()?.rating ?? 0): number {
    return Math.max(0, Math.min(1, rating - index));
  }
}
