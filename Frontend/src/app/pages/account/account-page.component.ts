import { Component } from "@angular/core";
import { AccountInfoComponent } from "@lib/auth";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  imports: [
    AccountInfoComponent
  ]
})
export class AccountPageComponent {}