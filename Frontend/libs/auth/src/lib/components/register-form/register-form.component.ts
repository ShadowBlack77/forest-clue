import { Component, inject, signal, WritableSignal } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { take } from "rxjs";

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
  private readonly _router: Router = inject(Router);

  protected readonly isFormSubmitted: WritableSignal<boolean> = signal(false);

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
    if (this.registerForm.valid) {
      this.isFormSubmitted.set(true);

      this._authService.register(this.registerForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: () => {
          this.isFormSubmitted.set(false);
          this._router.navigateByUrl('/auth/login');
        },
        error: () => {
          this.isFormSubmitted.set(false);
        }
      })
    }
  }
}