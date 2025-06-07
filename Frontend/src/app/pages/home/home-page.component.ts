import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProductsListComponent } from "@lib/forest-clue/products";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    RouterModule,
    ProductsListComponent,
  ]
})
export class HomePageComponent {
  
}