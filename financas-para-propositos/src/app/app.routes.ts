import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'welcome', loadComponent: () => import('./give-welcome/give-welcome').then((m) => m.GiveWelcome) },
  { path: '**', redirectTo: 'welcome' },
];
