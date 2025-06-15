import { Component, ViewEncapsulation } from "@angular/core";
import { GoogleLoginButtonComponent, LoginFormComponent } from "@lib/auth";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  imports: [
    LoginFormComponent,
    GoogleLoginButtonComponent
  ],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent {}