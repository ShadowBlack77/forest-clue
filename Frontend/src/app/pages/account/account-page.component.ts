import { Component } from "@angular/core";
import { AccountInfoComponent } from "@lib/auth";
import { OrdersListComponent } from "@lib/forest-clue/orders";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  imports: [
    AccountInfoComponent,
    OrdersListComponent
  ]
})
export class AccountPageComponent {}