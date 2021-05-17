import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPortalComponent } from './admin-portal.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPortalComponent,
    children: [
      {
        path: 'product-management',
        loadChildren: () =>
          import('./product-management/product-management.module').then(
            m => m.ProductManagementModule,
          ),
      },
      {
        path: '',
        redirectTo: 'product-management',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'product-management',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPortalRoutingModule {}
