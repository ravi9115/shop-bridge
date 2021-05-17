import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { AdminPortalRoutingModule } from './admin-portal-routing.module';
import { AdminPortalComponent } from './admin-portal.component';

const COMPONENTS = [AdminPortalComponent];

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule, AdminPortalRoutingModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AdminPortalModule {}
