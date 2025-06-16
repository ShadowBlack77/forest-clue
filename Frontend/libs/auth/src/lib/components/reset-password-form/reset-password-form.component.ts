import { Component, inject, signal, WritableSignal } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { take } from "rxjs";

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

  protected readonly isFormSubmitted: WritableSignal<boolean> = signal(false);
  protected readonly resetPasswordMessage: WritableSignal<string> = signal('');

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
    if (this.resetPasswordForm.valid) {
      this.isFormSubmitted.set(true);
      
      this._authService.resetPassword(this.resetPasswordForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: () => {
          this.resetPasswordMessage.set('Message sent! Average waiting time is 5 minutes.');
          this.isFormSubmitted.set(false);
        },
        error: () => {
          this.resetPasswordMessage.set('Error sending message. Please try again later.');
          this.isFormSubmitted.set(false);
        }
      });
    }
  }
}