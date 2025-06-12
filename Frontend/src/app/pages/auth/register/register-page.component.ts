import { Component } from "@angular/core";
import { RegisterFormComponent } from "@lib/auth";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  imports: [
    RegisterFormComponent
  ]
})
export class RegisterPageComponent {}