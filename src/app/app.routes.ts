import { Routes } from '@angular/router';
import { Products } from './exercises/product-card/product-card';
import { SignupForm } from './exercises/signup-form/signup-form';
import { Navbar } from './exercises/navbar/navbar';
import {HomePage} from './exercises/home-page/home-page';

export const routes: Routes = [
    {path: '', component: HomePage},
    {path: 'navbar', component: Navbar},
    {path: 'products', component: Products},
    {path: 'signup', component: SignupForm}
];
