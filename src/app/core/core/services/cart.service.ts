import { Injectable, computed, signal } from '@angular/core'; 
import { ProductWithQuantity } from '../models/product.model';


@Injectable(
    { providedIn: 'root' }
)     


export class CartService {
cartItems = signal<ProductWithQuantity[]>([]);
cartCount = computed(() => this.cartItems().reduce( (sum, product) => sum + product.quantity, 0 ) );

//when user add 0 product 
addToCart(product: ProductWithQuantity): void {
if (product.quantity === 0) {
    return;
}
// Check if the product already exists in the cart and update its quantity if it does, otherwise add it to the cart 
const existingProduct = this.cartItems().find(
    (item) => item.id === product.id
);

// Update the quantity of the existing product or add the new product to the cart
if (existingProduct) {
    this.cartItems.update((items) =>
    items.map((item) =>
    //Ternary operator to check if the item id matches the product id, if it does, update the product, otherwise return the item as is
    item.id === product.id
        ? { ...product }
        : item
    )
    );

} else {
// Add the new product to the cart
    this.cartItems.update((items) => [
    // Spread operator ?????
    ...items,
    { ...product }
    ]);

}
}


getQuantity(productId: number): number {

const product = this.cartItems().find(
    (item) => item.id === productId
);
//if the product is found, return its quantity, otherwise return 0
return product?.quantity ?? 0;
}
removeFromCart(productId: number): void {

this.cartItems.update((items) =>
    items.filter((item) => item.id !== productId)
);
}
}