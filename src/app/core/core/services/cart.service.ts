import { Injectable, computed, signal } from '@angular/core'; 
import { ProductWithQuantity } from '../models/product.model';


@Injectable(
    { providedIn: 'root' }
)     


export class CartService {
cartItems = signal<ProductWithQuantity[]>([]);
cartCount = computed(() => this.cartItems().reduce( (sum, product) => sum + product.quantity, 0 ) );


addToCart(product: ProductWithQuantity): void {
if (product.quantity === 0) {
    return;
}
const existingProduct = this.cartItems().find(
    (item) => item.id === product.id
);

if (existingProduct) {
    this.cartItems.update((items) =>
    items.map((item) =>
    item.id === product.id
        ? { ...product }
        : item
    )
    );

} else {
    this.cartItems.update((items) => [
    ...items,
    { ...product }
    ]);

}
}


getQuantity(productId: number): number {

const product = this.cartItems().find(
    (item) => item.id === productId
);
return product?.quantity ?? 0;
}
removeFromCart(productId: number): void {

this.cartItems.update((items) =>
    items.filter((item) => item.id !== productId)
);
}
updateQuantity(productId: number, quantity: number): void {
    this.cartItems.update((items) =>
      items.map((item) =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }
}