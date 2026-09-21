import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

type IconKey = 'necklace' | 'earring' | 'ring' | 'bracelet';

interface Benefit {
  en: string;
  ar: string;
}

interface Category {
  en: string;
  ar: string;
  count: number;
  bg: string;
  icon: IconKey;
}

interface SaleProduct {
  name: string;
  description: string;
  price: number;
  oldPrice: number | null;
  icon: IconKey;
}

@Component({
  standalone: true,
  imports: [RouterLink, FormsModule],
  selector: 'app-home',
  templateUrl: './home-page.html',
})
export class Home {
  email = signal('');

  readonly benefits: Benefit[] = [
    { en: 'Certified 18K gold', ar: 'ذهب عيار ١٨ معتمد' },
    { en: 'Free delivery', ar: 'توصيل مجاني' },
    { en: '30-day exchange', ar: 'استبدال خلال ٣٠ يوم' },
  ];
  readonly categories: Category[] = [
    { en: 'Necklaces', ar: 'قلائد', count: 28, bg: '#4A3B2A', icon: 'necklace' },
    { en: 'Earrings', ar: 'أقراط', count: 34, bg: '#5B2022', icon: 'earring' },
    { en: 'Rings', ar: 'خواتم', count: 41, bg: '#3D4322', icon: 'ring' },
    { en: 'Bracelets', ar: 'أساور', count: 19, bg: '#3A2E28', icon: 'bracelet' },
  ];

  readonly saleProducts: SaleProduct[] = [
    { name: 'Nour drop earrings', description: '18K gold, 0.6 ct diamonds', price: 12400, oldPrice: 24800, icon: 'earring' },
    { name: 'Layla layered chain', description: '18K gold, three lengths', price: 11340, oldPrice: 18900, icon: 'necklace' },
    { name: 'Shams solitaire ring', description: '18K gold, 1.0 ct diamond', price: 25200, oldPrice: 42000, icon: 'ring' },
    { name: 'Hilal cuff bracelet', description: '18K gold, hand-polished', price: 9900, oldPrice: 16500, icon: 'bracelet' },
  ];

  subscribe(): void {
    if (!this.email().trim()) {
      return;
    }
    console.log('Subscribed with', this.email());
    this.email.set('');
  }
}
