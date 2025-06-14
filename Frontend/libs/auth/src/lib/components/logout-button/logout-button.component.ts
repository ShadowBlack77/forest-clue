import { Component, inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { take } from "rxjs";

@Component({
  selector: 'lib-logout-button',
  templateUrl: './logout-button.component.html'
})
export class LogoutButtonComponent {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  logout(): void {
    this._authService.logout().pipe(
      take(1)
    ).subscribe({
      next: () => {
        this._router.navigateByUrl('/');
      }
    })
  }
}