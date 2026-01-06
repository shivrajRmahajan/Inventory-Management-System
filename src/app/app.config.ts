import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore()
]
};
