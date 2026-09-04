import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

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
  get isHome(): boolean {
    return this.router.url === '/' || this.router.url.startsWith('/?');
  }
}


