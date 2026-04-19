import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'welcome', loadComponent: () => import('./give-welcome/give-welcome').then((m) => m.GiveWelcome) },
  { path: 'get-started', loadComponent: () => import('./get-started/get-started').then((m) => m.GetStarted) },
  { path: 'manage-project', loadComponent: () => import('./manage-project/manage-project').then((m) => m.ManageProject) },
  { path: '**', redirectTo: 'get-started' },
];
