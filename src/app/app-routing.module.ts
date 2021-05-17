import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin-portal',
    loadChildren: () => import('./admin-portal/admin-portal.module').then(m => m.AdminPortalModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin-portal',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
