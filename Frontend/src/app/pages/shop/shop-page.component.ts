import { Component, input, InputSignal, OnInit, signal, WritableSignal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CategoriesListComponent, ProductsListComponent } from "@lib/forest-clue/products";

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  imports: [
    ProductsListComponent,
    FormsModule,
    CategoriesListComponent,
]
})
export class ShopPageComponent implements OnInit {

  protected readonly selectedPageSize: WritableSignal<number> = signal(8);
  protected readonly selectedPage: WritableSignal<number> = signal(1);
  protected readonly selectedCategory: WritableSignal<string> = signal('all');

  readonly category: InputSignal<string> = input('');

  ngOnInit(): void {
    this.selectedCategory.set(this.category() ?? 'all');
  }

  changePageSize(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    this.selectedPage.set(1);
    this.selectedPageSize.set(parseInt(value));
  }

  changeCategory(category: string): void {
    this.selectedCategory.set(category);
    this.selectedPage.set(1);
  }
}