import { CommonModule } from "@angular/common";
import { Component, inject, input, InputSignal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: 'lib-auth-header',
  templateUrl: './auth-header.component.html',
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class AuthHeaderComponent {
  
  private readonly _authService: AuthService = inject(AuthService);

  readonly isMobile: InputSignal<boolean> = input<boolean>(false);

  protected readonly user$: Observable<any> = this._authService.user$.asObservable();
}