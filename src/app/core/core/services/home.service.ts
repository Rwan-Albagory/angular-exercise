import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";





export interface Category{
    id : number;
    slug : string;
    en : string;
    ar : string;
    icon : string;
    bg : string; 
}

export interface product {
    id : number;
    category : string;
}

@Injectable({
    providedIn: 'root',
  })

export class HomeService {
    private http = inject(HttpClient);

    private baseUrl = 'https://runaq-api.onrender.com';

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.baseUrl}/categories`);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/products`);
    }


}