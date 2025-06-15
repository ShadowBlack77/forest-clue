import { Component, inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'lib-google-login-button',
  templateUrl: './google-login-button.component.html'
})
export class GoogleLoginButtonComponent {

  private readonly _authService: AuthService = inject(AuthService);

  googleLogin(): void {
    this._authService.googleLogin();
  }
}