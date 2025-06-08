import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ENV_TOKEN } from '@lib/core/env';
import { Environment } from '../env/environments';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthService } from '@lib/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => {
        return () => authService.init();
      },
      deps: [AuthService],
      multi: true
    },
    {
      provide: ENV_TOKEN,
      useValue: {
        apiUrl: Environment.apiUrl
      }
    }
  ]
};
