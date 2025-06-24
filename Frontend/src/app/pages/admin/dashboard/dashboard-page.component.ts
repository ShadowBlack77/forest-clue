import { Component } from "@angular/core";
import { AccountsCountComponent } from "@lib/forest-clue/admin";
import { OrdersCountComponent } from "@lib/forest-clue/orders";
import { ProductsCountComponent } from "@lib/forest-clue/products";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  imports: [
    AccountsCountComponent,
    ProductsCountComponent,
    OrdersCountComponent,
]
})
export class DashboardPageComponent {}