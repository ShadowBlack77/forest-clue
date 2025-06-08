import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENV_TOKEN, EnvConfig } from "@lib/core/env";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _env: EnvConfig = inject(ENV_TOKEN);

  send(): Observable<unknown> {
    return of();
  }
}