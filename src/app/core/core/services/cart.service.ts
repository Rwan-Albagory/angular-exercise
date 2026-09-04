import { Injectable, computed, signal } from "@angular/core";



@Injectable({
    providedIn: 'root'
})

export class CartService {
    private quantities = signal<Record<number, number>>({}); //{ 5: 3, 12: 1, 20: 7 }

    cartCount = computed(() =>
        Object.values(this.quantities()).reduce((sum, quantity) => sum + quantity, 0)
    );

    getQuantity(productId: number): number {
        return this.quantities()[productId] ?? 0;
    }

    setQuantity(productId: number, quantity: number): void {
        this.quantities.update((map) => ({ ...map, [productId]: quantity }));
    }
}