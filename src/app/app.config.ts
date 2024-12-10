import { APP_INITIALIZER, ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { preloadTranslations, TranslocoHttpLoader } from './core/services/transloco-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
    ),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['de', 'en'],
        defaultLang: 'de',
        fallbackLang: 'de',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: preloadTranslations,
      deps: [TranslocoService],
      multi: true
    }
  ]
};