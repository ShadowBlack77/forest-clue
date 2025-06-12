import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENV_TOKEN, EnvConfig } from "@lib/core/env";
import { BehaviorSubject, Observable, of, take } from "rxjs";
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
    return of();
  }

  register(register: Register): Observable<unknown> {
    return of();
  }

  logout(): Observable<void> {
    return of();
  }

  refresh(): Observable<void> {
    return of();
  }

  profile(): Observable<User | null> {
    return of({
      email: 'a@a.com',
      role: 'user'
    });
  }
}