import { Component, inject, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';
import { filter } from 'rxjs';

import { CartService } from '../../core/core/services/cart.service';

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  templateUrl: './navbar.html',
})

export class Navbar {
  private router = inject(Router);
  cartService = inject(CartService);
  menuOpen = signal(false);
  cartOpen = signal(false);

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.menuOpen.set(false));
  }

  get isHome(): boolean {
    return this.router.url === '/' || this.router.url.startsWith('/?');
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }


  toggleCart(): void {
    this.cartOpen.update(value => !value);
  }
}
