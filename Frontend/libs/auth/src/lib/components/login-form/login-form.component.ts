import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'lib-login-form',
  templateUrl: './login-form.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ]
})
export class LoginFormComponent {
 
  private readonly _authService: AuthService = inject(AuthService);

  protected readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8)
      ]
    })
  });

  onSubmit(): void {

  }
}