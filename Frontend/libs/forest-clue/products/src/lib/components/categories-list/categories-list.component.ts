import { Component, inject, input, InputSignal, output, OutputEmitterRef } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Observable } from "rxjs";
import { Category } from "../../models/category.model";
import { AsyncPipe, TitleCasePipe } from "@angular/common";

@Component({
  selector: 'lib-categories-list',
  templateUrl: './categories-list.component.html',
  imports: [
    AsyncPipe,
    TitleCasePipe
  ]
})
export class CategoriesListComponent {

  private readonly _productsService: ProductsService = inject(ProductsService);

  protected readonly changeCategoryEmitter: OutputEmitterRef<string> = output<string>();
  readonly currentCategory: InputSignal<string> = input.required<string>();
  protected readonly categories$: Observable<Category[]> = this._productsService.getCategories();

  changeCategory(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    this.changeCategoryEmitter.emit(value);
  }
}