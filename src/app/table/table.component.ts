import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-data-table',
  template: CDK_TABLE_TEMPLATE,
  styleUrls: ['table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDataTableComponent<T> extends CdkTable<T> {}
