import { inject, Injectable } from "@angular/core";
import { ENV_TOKEN, EnvConfig } from "@lib/core/env";
import { Observable, of } from "rxjs";
import { Product } from "../models/product.model";
import { HttpClient } from "@angular/common/http";
import { Category } from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _env: EnvConfig = inject(ENV_TOKEN);

  getAll(page: number, size: number, category: string): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this._env.apiUrl}/products?page=${page}&pageSize=${size}&category=${category}`);
  }

  getFeatured(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this._env.apiUrl}/products/featured`);
  }

  getProductsCount(): Observable<number> {
    return this._httpClient.get<number>(`${this._env.apiUrl}/products/count`);
  }

  getCategories(): Observable<Category[]> {
    return this._httpClient.get<Category[]>(`${this._env.apiUrl}/products/categories`);
  }
}