import { Component, input, InputSignal } from "@angular/core";
import { NewPasswordFormComponent } from "@lib/auth";

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  imports: [
    NewPasswordFormComponent
  ]
})
export class ResetPasswordPageComponent {
  
  protected readonly token: InputSignal<string> = input.required();
  protected readonly email: InputSignal<string> = input.required();
}