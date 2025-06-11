import { Component } from "@angular/core";
import { UserCartComponent } from "@lib/forest-clue/cart";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  imports: [
    UserCartComponent
  ]
})
export class CartPageComponent {}