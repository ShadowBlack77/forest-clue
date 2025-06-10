import { Component, input, InputSignal, OnInit, signal, WritableSignal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProductsListComponent } from "@lib/forest-clue/products";

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  imports: [
    ProductsListComponent,
    FormsModule
  ]
})
export class ShopPageComponent implements OnInit {

  protected readonly selectedPageSize: WritableSignal<string> = signal('5');
  protected readonly selectedPage: WritableSignal<number> = signal(1);
  protected readonly selectedCategory: WritableSignal<string> = signal('all');

  readonly category: InputSignal<string> = input('');

  ngOnInit(): void {
    this.selectedCategory.set(this.category() ?? 'all');
  }

  changePageSize(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    this.selectedPage.set(1);
    this.selectedPageSize.set(value);
  }

  changeCategory(): void {
    this.selectedPage.set(1);
  }
}