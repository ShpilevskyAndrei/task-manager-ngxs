import { Routes } from '@angular/router';
import { inject } from '@angular/core';

import { map, Observable } from 'rxjs';

import { Store } from '@ngxs/store';

import { AuthState } from './shared/state/auth/auth.state';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./features/welcome/welcome.component').then(
        (m) => m.WelcomeComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
    canMatch: [
      (): Observable<boolean> => {
        const _store = inject(Store);

        return _store.select(AuthState.isAuthenticated).pipe(map((e) => !e));
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
    canMatch: [
      (): Observable<boolean> => {
        const _store = inject(Store);

        return _store.select(AuthState.isAuthenticated);
      },
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tasks',
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./features/dashboard/pages/tasks/tasks.component').then(
            (m) => m.TasksComponent,
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/dashboard/pages/users/users.component').then(
            (m) => m.UsersComponent,
          ),
      },
      {
        path: 'user-info',
        loadComponent: () =>
          import(
            './features/dashboard/pages/user-info/user-info.component'
          ).then((m) => m.UserInfoComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'welcome',
  },
];
