import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@app/shared';
import { AppTableModule } from '@app/table';
import { ProductManagementComponent } from './product-management.component';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductManagementModalComponent } from './product-management-modal/product-management-modal.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { ProductManagementService } from './product-management.service';

const COMPONENTS = [
  ProductManagementComponent,
  ProductManagementModalComponent,
  ProductMenuComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    NgbModule,
    ProductManagementRoutingModule,
    SharedModule,
    AppTableModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  providers: [ProductManagementService],
})
export class ProductManagementModule {}
