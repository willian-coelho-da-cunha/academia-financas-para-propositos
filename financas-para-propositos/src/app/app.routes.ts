import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'welcome', loadComponent: () => import('./give-welcome/give-welcome').then((m) => m.GiveWelcome) },
  { path: 'get-started', loadComponent: () => import('./get-started/get-started').then((m) => m.GetStarted) },
  {
    path: 'manage-project',
    loadComponent: () => import('./manage-project/manage-project').then((m) => m.ManageProject),
  },
  {
    path: 'financial-goal/:goal',
    loadComponent: () => import('./financial-purpose/financial-purpose').then((m) => m.FinancialPurpose),
  },
  {
    path: 'analytics-dashboards',
    loadComponent: () => import('./analytics-dashboards/analytics-dashboards').then((m) => m.AnalyticsDashboards),
  },
  { path: '**', redirectTo: 'welcome' },
];
