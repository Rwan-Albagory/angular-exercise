import { Injectable, signal } from "@angular/core";



@Injectable({
    providedIn: 'root'
})

export class CartService {
    cartCount = signal(0);

    addToCart( quantity: number): void {
        this.cartCount.update((count) => count + quantity);
    }
}