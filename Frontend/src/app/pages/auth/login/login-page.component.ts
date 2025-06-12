import { Component, ViewEncapsulation } from "@angular/core";
import { LoginFormComponent } from "@lib/auth";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  imports: [
    LoginFormComponent
  ],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent {}