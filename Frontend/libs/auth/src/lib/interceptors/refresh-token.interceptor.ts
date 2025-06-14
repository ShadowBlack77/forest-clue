import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, concatMap, filter, finalize, Observable, take, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenInterceptor implements HttpInterceptor {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _isRefreshing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('login')) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return this._handle401Error(req, next);
        }

        return throwError(err);
      })
    )
  }

  private _handle401Error(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this._isRefreshing.getValue()) {
      this._isRefreshing.next(true);

      return this._authService.refresh().pipe(
        concatMap(() => {
          return next.handle(req);
        }),
        finalize(() => this._isRefreshing.next(false))
      );
    }

    return this._isRefreshing.asObservable().pipe(
      filter((isRefreshing: boolean) => !isRefreshing),
      take(1),
      concatMap(() => next.handle(req))
    );
  }
}