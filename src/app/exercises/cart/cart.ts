import { Component, inject } from '@angular/core';
import { CartService } from '../../core/core/services/cart.service';
import { ProductWithQuantity } from '../../core/core/models/product.model';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-cart',
  templateUrl: './cart.html',
})
export class Cart {
  cartService = inject(CartService);

  increase(product: ProductWithQuantity): void {
    if (product.quantity < 10) {
      this.cartService.updateQuantity(product.id, product.quantity + 1);
    }
  }

  decrease(product: ProductWithQuantity): void {
    if (product.quantity > 1) {
      this.cartService.updateQuantity(product.id, product.quantity - 1);
    }
  }

  getSubtotal(): number {
    return this.cartService.cartItems().reduce(
      (total, product) =>
        total + product.price * product.quantity,
      0
    );
  }

  getDiscount(): number {
    return this.cartService.cartItems().reduce(
      (total, product) =>
        total +
        (product.price *
          product.quantity *
          product.discountPercentage) /
          100,
      0
    );
  }

  getNetTotal(): number {
    return this.getSubtotal() - this.getDiscount();
  }
}