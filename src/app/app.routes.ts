import { Routes } from '@angular/router';
import {Home} from './exercises/home-page/home-page';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'navbar', loadComponent: () =>
        import ('./exercises/navbar/navbar') .then(m => m.Navbar)
    },
    {path: 'products', loadComponent: () =>
        import ('./exercises/product-card/product-card') .then(m => m.Products)
    },
    {path: 'products/:category', loadComponent: () =>
        import ('./exercises/product-card/product-card') .then(m => m.Products)
    },
    {path: 'product/:id', loadComponent: () => 
        import ('./exercises/product-details/product-details') .then(m => m.ProductDetails)
    },
    {path: 'signup', loadComponent: () => 
        import ('./exercises/signup-form/signup-form') .then(m => m.SignupForm)
    },
    {path: 'cart', loadComponent: () => 
        import ('./exercises/cart/cart') .then(m => m.Cart)
    },
    {path: 'our-story', loadComponent: () => 
        import ('./our-story/our-story') .then(m => m.OurStory)
    }
];
