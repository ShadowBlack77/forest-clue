import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { CartButtonComponent } from "@lib/forest-clue/cart";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'lib-products-list',
  templateUrl: './products-list.component.html',
  imports: [
    CommonModule,
    NgOptimizedImage,
    CartButtonComponent
  ]
})
export class ProductsListComponent {

  protected readonly products$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
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