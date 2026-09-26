import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeService, Category } from '../../core/core/services/home.service';
import { forkJoin } from 'rxjs';

type IconKey = 'necklace' | 'earring' | 'ring' | 'bracelet';

interface SaleProduct {
  name: string;
  description: string;
  price: number;
  oldPrice: number | null;
  icon: IconKey;
}


interface Benefit {
  en : string;
  ar : string;
}

@Component({
  standalone: true,
  imports: [RouterLink, FormsModule],
  selector: 'app-home',
  templateUrl: './home-page.html',
})
export class Home implements OnInit {

  readonly benefits: Benefit[] = [
    { en: 'Certified 18K gold', ar: 'ذهب عيار ١٨ معتمد' },
    { en: 'Free delivery', ar: 'توصيل مجاني' },
    { en: '30-day exchange', ar: 'استبدال خلال ٣٠ يوم' },
  ];
  readonly saleProducts: SaleProduct[] = [
    { name: 'Nour drop earrings', description: '18K gold, 0.6 ct diamonds', price: 12400, oldPrice: 24800, icon: 'earring' },
    { name: 'Layla layered chain', description: '18K gold, three lengths', price: 11340, oldPrice: 18900, icon: 'necklace' },
    { name: 'Shams solitaire ring', description: '18K gold, 1.0 ct diamond', price: 25200, oldPrice: 42000, icon: 'ring' },
    { name: 'Hilal cuff bracelet', description: '18K gold, hand-polished', price: 9900, oldPrice: 16500, icon: 'bracelet' },
  ];

  email = signal('');

  private homeService = inject(HomeService);

  categories = signal<(Category & {count:number})[]>([]);

  loading = signal(true);

  error = signal('')

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories():void{
    this.loading.set(true);
    this.error.set('');

    forkJoin({
      categories: this.homeService.getCategories(),
      Products: this.homeService.getProducts(),
    }).subscribe({
      next: ({ categories, Products}) =>{
        const categoriesWithCount = categories.map((category) =>{
          const count = Products.filter(
            (Product) => Product.category === category.slug
          ).length;

          return {
            ...category,
            count,
          };
        });

        this.categories.set(categoriesWithCount);
        this.loading.set(false);
      },

      error: () => {
        this.categories.set([]);
        this.error.set(
          'Failed to load categories and products. Please try again.'
        );
        this.loading.set(false);
      },
    });
  }

  
  

  subscribe(): void {
    if (!this.email().trim()) {
      return;
    }
    console.log('Subscribed with', this.email());
    this.email.set('');
  }
}
