import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { ENV_TOKEN } from '@lib/core/env';
import { Environment } from '../env/environments';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApiKeyInterceptor, AuthService, RefreshTokenInterceptor } from '@lib/auth';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects, productsReducer } from '@lib/forest-clue/products';
import { LOCAL_STORAGE_TOKEN, WINDOW_TOKEN } from '@lib/core/tokens';
import { CartEffects, cartReducer } from '@lib/forest-clue/cart';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
        routes, 
        withViewTransitions(), 
        withComponentInputBinding(),
        withInMemoryScrolling({
            scrollPositionRestoration: 'top'
        })
    ),
    provideHttpClient(withInterceptorsFromDi()),
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
            apiUrl: Environment.apiUrl,
            apiKey: Environment.apiKey,
            stripePublicKey: Environment.stripePublicKey
        }
    },
    {
        provide: LOCAL_STORAGE_TOKEN,
        useValue: localStorage
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiKeyInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: RefreshTokenInterceptor,
        multi: true
    },
    {
        provide: WINDOW_TOKEN,
        useValue: window
    },
    provideStore({
        'products': productsReducer,
        'cart': cartReducer,
    }),
    provideEffects([
        ProductsEffects,
        CartEffects
    ])
]
};
