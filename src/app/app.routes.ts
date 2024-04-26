import { Routes } from '@angular/router';

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
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
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
    ],
  },
  {
    path: '**',
    redirectTo: 'welcome',
  },
];
