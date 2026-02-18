import { Routes } from '@angular/router';

export const WAREHOUSE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/warehouse-list/warehouse-list.page').then(m => m.WarehouseList)
    },
    // Add more warehouse routes here, e.g.:
    {
        path: 'create',
        loadComponent: () => import('./pages/warehouse-form/warehouse-form.page').then(m => m.WarehouseFormPage)
    },
    // {
    //   path: ':id',
    //   loadComponent: () => import('./pages/warehouse-details/warehouse-details.page').then(m => m.WarehouseDetailsPage)
    // }
];
