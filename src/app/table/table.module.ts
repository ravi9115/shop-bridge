import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CdkTableModule } from '@angular/cdk/table';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SpinnerComponent } from './spinner/spinner.component';
import { AppDataTableComponent } from './table.component';
import { TableWrapperComponent } from './table-wrapper/table-wrapper.component';

const COMPONENTS = [TableWrapperComponent, AppDataTableComponent, SpinnerComponent];

@NgModule({
  imports: [CommonModule, CdkTableModule, NgbModule, InfiniteScrollModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AppTableModule {}
