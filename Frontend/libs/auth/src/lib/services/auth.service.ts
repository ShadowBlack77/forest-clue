import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENV_TOKEN, EnvConfig } from "@lib/core/env";
import { BehaviorSubject, map, Observable, of, switchMap, take } from "rxjs";
import { User } from "../models/user.model";
import { Login } from "../models/login.model";
import { Register } from "../models/register.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _env: EnvConfig = inject(ENV_TOKEN);

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
          map((user) => {
            this.user$.next(user);
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
      })
    );
  }

  refresh(): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/auth/refresh`, {}, { withCredentials: true });
  }

  profile(): Observable<User | null> {
    return this._httpClient.get<User>(`${this._env.apiUrl}/auth/profile`, { withCredentials: true });
  }
}