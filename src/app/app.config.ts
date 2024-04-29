import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { states } from './shared/state';
import { TOKENS_KEYS } from './core/constants/storage-keys';

import { routes } from './app.routes';
import { progressBarInterceptor } from './core/interceptors/progress-bar.interceptor';
import { provideCourseConfig } from './core/configs/course.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideCourseConfig(),
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([progressBarInterceptor])),
    importProvidersFrom(
      NgxsModule.forRoot(states, {
        developmentMode: isDevMode(),
      }),
    ),
    importProvidersFrom(
      NgxsStoragePluginModule.forRoot({
        key: TOKENS_KEYS,
      }),
    ),
    importProvidersFrom(NgxsReduxDevtoolsPluginModule.forRoot()),
  ],
};
