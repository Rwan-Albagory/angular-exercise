import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

interface product{
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

@Component({
  imports: [ CurrencyPipe ],
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './product-card.html',
})
export class ProductCard {
  product: product = {
    id: 1,
    name: 'Eternity Chain Bracelet ' ,
    price: 50000,
    image: 'https://eg.azzafahmy.com/cdn/shop/files/FBSG.24-001-01-2_2.jpg?v=1735046609&width=800' ,
    description: '18kt Gold and Sterling Silver. Inscribed with "إنت عمري" - “You are my eternity”. Sizes: One Size - Shortest Length: 15.5 cm - Longest Length: 18 cm.' ,
  };

  quantity = 0; 

  increase(): void {
    if (this.quantity < 10) {
      this.quantity++;
      console.log('Quantity:', this.quantity);
    }
  }

  decrease(): void {
    if (this.quantity > 0) {
      this.quantity--;
      console.log('Quantity:', this.quantity);
    }
  }

}
