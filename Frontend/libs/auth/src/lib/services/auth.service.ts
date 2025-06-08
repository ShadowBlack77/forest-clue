import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENV_TOKEN, EnvConfig } from "@lib/core/env";
import { BehaviorSubject, Observable, of, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _env: EnvConfig = inject(ENV_TOKEN);

  protected readonly user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

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

  profile(): Observable<unknown> {
    return of(null);
  }
}