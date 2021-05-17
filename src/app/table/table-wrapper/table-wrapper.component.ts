/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  HostBinding,
  Input,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppDataSource } from '../datasource';
import { AppDataTableComponent } from '../table.component';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWrapperComponent implements AfterViewInit, OnDestroy {
  get count() {
    if (!this.ds || !this.ds.totalCount) {
      return null;
    }
    return this.ds.totalCount;
  }

  @ContentChild(AppDataTableComponent) table!: AppDataTableComponent<any>;
  @ContentChild('metaTemplate') metaTemplate!: TemplateRef<any>;
  @Input() hideMeta = false;
  @HostBinding('class.no-content') noContent = false;

  ds: AppDataSource<any>;
  visible = 0;
  isLoading$: Observable<boolean>;
  isSearch$: Observable<boolean>;
  destroyed$ = new Subject<boolean>();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngAfterViewInit(): void {
    this.ds = this.table.dataSource as AppDataSource<any>;
    this.ds.state$.pipe(takeUntil(this.destroyed$)).subscribe(state => {
      this.visible = state?.length || 0;
      if (this.ds && this.ds.totalCount) {
        this.noContent = this.ds.totalCount === 0;
      }
      this.cd.detectChanges();
    });
    this.isLoading$ = this.ds.loading$;
  }

  loadMore(): void {
    if (this.ds && !this.ds.loading && this.ds.hasNext()) {
      this.ds.loadNext();
    }
  }
}
