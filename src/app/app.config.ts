import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { TasksState } from './store/tasks/tasks.state';
import { UsersState } from './store/users/users.state';

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
      NgxsModule.forRoot([UsersState, TasksState], {
        developmentMode: isDevMode(),
      }),
    ),
    importProvidersFrom(NgxsReduxDevtoolsPluginModule.forRoot()),
  ],
};
