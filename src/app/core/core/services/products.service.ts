import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductResponse } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private http = inject(HttpClient);
    private apiUrl = 'https://dummyjson.com/products/category/womens-jewellery';

    getProducts(): Observable<ProductResponse> {
        return this.http.get<ProductResponse>(this.apiUrl);
    }
}