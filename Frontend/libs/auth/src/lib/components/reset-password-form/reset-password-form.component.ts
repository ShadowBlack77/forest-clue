import { Component, inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'lib-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ]
})
export class ResetPasswordFormComponent {

  private readonly _authService: AuthService = inject(AuthService);

  protected readonly resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
  });

  onSubmit(): void {

  }
}