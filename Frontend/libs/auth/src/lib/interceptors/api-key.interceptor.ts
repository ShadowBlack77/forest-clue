import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENV_TOKEN, EnvConfig } from "@lib/core/env";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiKeyInterceptor implements HttpInterceptor {

  private readonly _env: EnvConfig = inject(ENV_TOKEN);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        'X-API-KEY': this._env.apiKey
      }
    });

    return next.handle(clonedRequest);
  }

}