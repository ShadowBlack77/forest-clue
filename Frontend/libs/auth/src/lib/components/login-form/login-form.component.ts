import { Component, inject, signal, WritableSignal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router, RouterLink } from "@angular/router";
import { take } from "rxjs";

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
  private readonly _router: Router = inject(Router);

  protected readonly isFormSubmitted: WritableSignal<boolean> = signal(false);

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
    if (this.loginForm.valid) {
      this.isFormSubmitted.set(true);

      this._authService.login(this.loginForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: () => {
          this.isFormSubmitted.set(false);
          this._router.navigateByUrl('/');
        },
        error: () => {
          this.isFormSubmitted.set(false);
        }
      })
    }
  }
}