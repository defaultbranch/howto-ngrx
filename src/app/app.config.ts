import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: SIMPLE_ENTITIES_FEATURE_KEY, reducer: SIMPLE_ENTITIES_REDUCER }),
  ]
};
