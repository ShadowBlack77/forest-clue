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

  send(contact: any): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/contact`, { to: 'shadowblack77.dev@gmail.com', subject: 'Contact Form', body: `${contact.email}: ${contact.message}` });
  }
}