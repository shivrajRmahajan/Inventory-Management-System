import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'quotation', loadComponent: () => import('./features/quotation/pages/quotation-list/quotation').then(m => m.Quotation) },
      { path: 'add-quotation', loadComponent: () => import('./features/quotation/pages/add-quotation/add-quotation').then(m => m.AddQuotation) },
      { path: 'warehouses', loadChildren: () => import('./features/warehouses/warehouse.routes').then(m => m.WAREHOUSE_ROUTES) },
    ]
  }
];
