import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { TasksState } from '../state/tasks.state';

import { routes } from './app.routes';
import { progressBarInterceptor } from './core/interceptors/progress-bar.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([progressBarInterceptor])),
    importProvidersFrom(
      NgxsModule.forRoot([TasksState], { developmentMode: isDevMode() }),
    ),
    importProvidersFrom(NgxsReduxDevtoolsPluginModule.forRoot()),
  ],
};
