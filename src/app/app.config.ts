import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore, provideState } from '@ngrx/store';

import { routes } from './app.routes';
import { SIMPLE_ENTITIES_FEATURE_KEY } from './simple-entity/simple-entity.actions';
import { SIMPLE_ENTITIES_REDUCER } from './simple-entity/simple-entity.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: SIMPLE_ENTITIES_FEATURE_KEY, reducer: SIMPLE_ENTITIES_REDUCER }),
  ]
};
