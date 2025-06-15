import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {

  private readonly _router: Router = inject(Router);
  private readonly _authService: AuthService = inject(AuthService);

  canActivate(): Observable<boolean> {
    return this._authService.user$.pipe(
      map((user) => {
        if (!user || user.role !== 'Manager') {
          this._router.navigateByUrl('/');

          return false;
        }

        return true;
      })
    )
  }
}