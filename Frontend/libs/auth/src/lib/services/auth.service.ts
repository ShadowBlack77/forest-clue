import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENV_TOKEN, EnvConfig } from "@lib/core/env";
import { BehaviorSubject, map, Observable, of, switchMap, take, tap } from "rxjs";
import { User } from "../models/user.model";
import { Login } from "../models/login.model";
import { Register } from "../models/register.model";
import { LocalStorageService, Window, WINDOW_TOKEN } from "@lib/core/tokens";
import { Store } from "@ngrx/store";
import { CartState, selectCart } from "@lib/forest-clue/cart";
import { loadCart, saveCartItems } from "../../../../forest-clue/cart/src/lib/store/cart.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _store: Store<CartState> = inject(Store);
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _env: EnvConfig = inject(ENV_TOKEN);
  private readonly _window: Window = inject(WINDOW_TOKEN);
  private readonly _localStorage: LocalStorageService = inject(LocalStorageService)

  readonly user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  init(): Observable<void> {
    return new Observable((observer) => {
      this.profile().pipe(
        take(1)
      ).subscribe({
        next: (user) => {
          this.user$.next(user);
          
          observer.next();
          observer.complete();
        },
        error: () => {
          this.user$.next(null);

          observer.next();
          observer.complete();
        }
      })
    })
  }

  login(login: Login): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/auth/login`, login, { withCredentials: true }).pipe(
      switchMap(() => {
        return this.profile().pipe(
          take(1),
          switchMap((user) => {
            this.user$.next(user);

            return this._store.select(selectCart).pipe(
              take(1),
              switchMap((cart) => {
                return of(this._store.dispatch(saveCartItems({ cartItems: cart.items }))).pipe(
                  tap(() => {
                    this._localStorage.removeItem('cart');
                    this._store.dispatch(loadCart());
                  })
                );
              })
            )
          })
        )
      })
    );
  }

  register(register: Register): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/auth/register`, register);
  }

  logout(): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/auth/logout`, {}, { withCredentials: true }).pipe(
      take(1),
      map(() => {
        this.user$.next(null);
        this._store.dispatch(loadCart());
      })
    );
  }

  refresh(): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/auth/refresh`, {}, { withCredentials: true });
  }

  profile(): Observable<User | null> {
    return this._httpClient.get<User>(`${this._env.apiUrl}/auth/profile`, { withCredentials: true });
  }

  resetPassword(resetPassword: any): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/auth/reset-password`, resetPassword);
  }

  newPassword(newPassword: any): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/auth/new-password`, newPassword);
  }

  googleLogin(): void {
    this._window.location.href = `${this._env.apiUrl}/auth/login/google?returnUrl=http://localhost:4200`
  }
}