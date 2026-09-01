import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  templateUrl: './navbar.html',
})
export class Navbar {
  private router = inject(Router);

  get isHome(): boolean {
    return this.router.url === '/' || this.router.url.startsWith('/?');
  }
}
