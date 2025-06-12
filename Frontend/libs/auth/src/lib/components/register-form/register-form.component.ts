import { Component, inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'lib-register-form',
  templateUrl: './register-form.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ]
})
export class RegisterFormComponent {

  private readonly _authService: AuthService = inject(AuthService);

  protected readonly registerForm: FormGroup = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),
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
    }),
  });

  onSubmit(): void {

  }
}