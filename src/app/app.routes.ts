import { Routes } from '@angular/router';
import { Products } from './exercises/product-card/product-card';
import { SignupForm } from './exercises/signup-form/signup-form';
import { Navbar } from './exercises/navbar/navbar';
import {Home} from './exercises/home-page/home-page';
import { ProductDetails } from './exercises/product-details/product-details';
import { Cart } from './exercises/cart/cart';
import { OurStory } from './our-story/our-story';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'navbar', component: Navbar},
    {path: 'products', component: Products},
    {path: 'products/:id', component: ProductDetails},
    {path: 'signup', component: SignupForm},
    {path: 'cart', component: Cart},
    {path: 'our-story', component: OurStory}
];
