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
    
    return of([
      {
        id: 1,
        name: "Backpack",
        description: "Nice Backpack",
        category: "backpackes",
        price: 100.00,
        inStock: 10,
        imageUrl: "https://portdesigns.com/img/cms/Produits/BP%20HOUSTON%20ECO/110265%20-%20110276%20-%20PORT%20-%20HOUSTON%20II%20ECO%20BP%20-%20PERS.jpg",
        featured: false
      },
      {
        id: 2,
        name: "Backpack",
        description: "Nice Backpack",
        category: "backpackes",
        price: 100.00,
        inStock: 10,
        imageUrl: "https://portdesigns.com/img/cms/Produits/BP%20HOUSTON%20ECO/110265%20-%20110276%20-%20PORT%20-%20HOUSTON%20II%20ECO%20BP%20-%20PERS.jpg",
        featured: false
      }
    ])
  }

  getFeatured(): Observable<Product[]> {
    return of([
      {
        id: 1,
        name: "Backpack",
        description: "Nice Backpack",
        category: "backpackes",
        price: 100.00,
        inStock: 10,
        imageUrl: "https://portdesigns.com/img/cms/Produits/BP%20HOUSTON%20ECO/110265%20-%20110276%20-%20PORT%20-%20HOUSTON%20II%20ECO%20BP%20-%20PERS.jpg",
        featured: false
      },
      {
        id: 2,
        name: "Backpack",
        description: "Nice Backpack",
        category: "backpackes",
        price: 100.00,
        inStock: 10,
        imageUrl: "https://portdesigns.com/img/cms/Produits/BP%20HOUSTON%20ECO/110265%20-%20110276%20-%20PORT%20-%20HOUSTON%20II%20ECO%20BP%20-%20PERS.jpg",
        featured: false
      }
    ])
  }

  getProductsCount(): Observable<number> {
    return of(2);
  }

  getCategories(): Observable<Category[]> {
    return of([
      {
        name: 'all'
      },
      {
        name: 'backpacks'
      },
      {
        name: 'equipment'
      },
      {
        name: 'shoes'
      },
      {
        name: 'jackets'
      },
      {
        name: 'bicycles'
      }
    ])
  }
}