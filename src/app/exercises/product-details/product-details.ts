import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Product, ProductReview } from '../../core/core/models/product.model';
import { CartService } from '../../core/core/services/cart.service';
import { ProductsService } from '../../core/core/services/products.service';

@Component({
  standalone: true,
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  imports: [RouterLink, DatePipe, DecimalPipe],
})
export class ProductDetails implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  private autoPlayId: ReturnType<typeof setInterval> | null = null;
  private fadeTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private readonly autoPlayMs = 5000;
  private readonly fadeMs = 300;

  product = signal<Product | null>(null);
  selectedImage = signal('');
  quantity = signal(1);
  loading = signal(true);
  error = signal('');
  addedToCart = signal(false);
  currentReviewIndex = signal(0);
  reviewVisible = signal(false);

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

  reviews = computed<ProductReview[]>(() => this.product()?.reviews ?? []);

  currentReview = computed(() => this.reviews()[this.currentReviewIndex()] ?? null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.selectedImage.set(product.thumbnail || product.images?.[0] || '');
        this.quantity.set(this.cartService.getQuantity(product.id) || 1);
        this.currentReviewIndex.set(0);
        this.playReviewEnter();
        this.startAutoPlay();
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

  ngOnDestroy(): void {
    this.stopAutoPlay();
    this.clearFadeTimeout();
  }

  nextReview(resetTimer = true): void {
    this.moveReview(1);
    if (resetTimer) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  previousReview(): void {
    this.moveReview(-1);
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  goToReview(index: number): void {
    const count = this.reviews().length;
    if (count === 0 || index === this.currentReviewIndex()) {
      return;
    }

    this.changeReview((index + count) % count);
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  startAutoPlay(): void {
    this.stopAutoPlay();
    if (this.reviews().length < 2) {
      return;
    }

    this.autoPlayId = setInterval(() => this.nextReview(false), this.autoPlayMs);
  }

  stopAutoPlay(): void {
    if (this.autoPlayId === null) {
      return;
    }

    clearInterval(this.autoPlayId);
    this.autoPlayId = null;
  }

  private moveReview(step: number): void {
    const count = this.reviews().length;
    if (count === 0) {
      return;
    }

    this.changeReview((this.currentReviewIndex() + step + count) % count);
  }

  private changeReview(index: number): void {
    this.reviewVisible.set(false);
    this.clearFadeTimeout();
    this.fadeTimeoutId = setTimeout(() => {
      this.currentReviewIndex.set(index);
      this.fadeTimeoutId = setTimeout(() => this.reviewVisible.set(true), 40);
    }, this.fadeMs);
  }

  private playReviewEnter(): void {
    this.reviewVisible.set(false);
    this.clearFadeTimeout();
    this.fadeTimeoutId = setTimeout(() => this.reviewVisible.set(true), 40);
  }

  private clearFadeTimeout(): void {
    if (this.fadeTimeoutId === null) {
      return;
    }

    clearTimeout(this.fadeTimeoutId);
    this.fadeTimeoutId = null;
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
