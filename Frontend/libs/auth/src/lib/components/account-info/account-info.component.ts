import { Component, inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";
import { User } from "../../models/user.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'lib-account-info',
  templateUrl: './account-info.component.html',
  imports: [
    CommonModule
  ]
})
export class AccountInfoComponent {

  private readonly _authService: AuthService = inject(AuthService);

  protected readonly user$: Observable<User | null> = this._authService.user$;
}