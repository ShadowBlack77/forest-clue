import { Component, inject, input, InputSignal, signal, WritableSignal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { RouterLink } from "@angular/router";
import { take } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'lib-new-password-form',
  templateUrl: './new-password-form.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ]
})
export class NewPasswordFormComponent {

  private readonly _authService: AuthService = inject(AuthService);

  readonly token: InputSignal<string> = input.required();
  readonly email: InputSignal<string> = input.required();

  protected readonly isFormSubmitted: WritableSignal<boolean> = signal(false);
  protected readonly newPasswordMessage: WritableSignal<string> = signal('');

  protected readonly newPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8)
      ]
    })
  });

  onSubmit(): void {
    if (this.newPasswordForm.valid) {
      this.isFormSubmitted.set(true);

      const newPasswordPayload = {
        email: this.email(),
        token: decodeURIComponent(this.token()),
        ...this.newPasswordForm.getRawValue()
      }

      this._authService.newPassword(newPasswordPayload).pipe(
        take(1)
      ).subscribe({
        next: () => {
          this.newPasswordMessage.set('Password reset successfully');
          this.isFormSubmitted.set(false);
        },
        error: () => {
          this.newPasswordMessage.set('An error occurred while resetting your password. Please try again later or contact support.');
          this.isFormSubmitted.set(false);
        }
      })
    }
  }
}