import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ENV_TOKEN } from '@lib/core/env';
import { Environment } from '../env/environments';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: ENV_TOKEN,
      useValue: {
        apiUrl: Environment.apiUrl
      }
    }
  ]
};
