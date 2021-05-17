/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DataSource } from '@angular/cdk/collections';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { TableDataBase } from './ds-meta';

export class AppDataSource<T> implements DataSource<T> {
  public get totalCount(): number {
    return this.countSubject$.getValue();
  }

  public get currentPage() {
    return this.currentSubject$.getValue();
  }

  public get loading() {
    return this.loadingSubject$.getValue();
  }

  public get state() {
    return this.stateSubject$.getValue();
  }

  state$: Observable<T[]>;
  loading$: Observable<boolean>;
  isSearch$: Observable<boolean>;

  private countSubject$ = new BehaviorSubject<number>(0);
  private nextSubject$ = new BehaviorSubject<string | null>(null);
  private currentSubject$ = new BehaviorSubject<string | null>(null);
  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  private isSearchSubject$ = new BehaviorSubject<boolean>(false);

  private stateSubject$ = new BehaviorSubject<T[]>([]);
  private lastReq: Subscription = new Subscription();

  constructor(private db: TableDataBase, private endPoint: string) {
    this.load(endPoint);
    this.state$ = this.stateSubject$.asObservable();
    this.loading$ = this.loadingSubject$.asObservable();
    this.isSearch$ = this.isSearchSubject$.asObservable();
  }

  hasNext(): boolean {
    if (!this.nextSubject$.getValue()) {
      return false;
    }
    return !!this.nextSubject$.getValue();
  }

  connect(): Observable<T[]> {
    return this.state$;
  }

  disconnect(): void {
    this.stopLastRequest();
    this.countSubject$.complete();
    this.nextSubject$.complete();
    this.currentSubject$.complete();
    this.stateSubject$.complete();
    this.isSearchSubject$.complete();
  }

  parseLinkHeader(linkHeader) {
    const linkHeadersArray = linkHeader
      .split(', ')
      .map(header => header.split('; '))
      .reduce((outputObj, value) => {
        const headerRel = value[1].replace(/"/g, '').replace('rel=', '');
        const headerUrl = value[0].slice(1, -1);
        return { ...outputObj, [headerRel]: headerUrl };
      }, {});
    return linkHeadersArray;
  }

  load(endPoint: string, overwrite?: boolean): void {
    this.lastReq = this.makeRequest(endPoint).subscribe(
      (v: any) => {
        const headers = v.headers;
        const linkHeader = headers.get('Link');
        const countHeader = headers.get('X-Total-Count');
        const links = this.parseLinkHeader(linkHeader);
        const body = v.body;
        this.countSubject$.next(+countHeader);
        this.currentSubject$.next(endPoint);
        this.nextSubject$.next(links.next);
        this.isSearchSubject$.next(overwrite);

        const newData = body.map((value: any) => ({ ...value, isExpanded: false }));
        const old = this.stateSubject$.getValue();
        let data: any[];
        if (overwrite) {
          data = [...newData];
        } else {
          data = [...old, ...newData];
        }

        this.stateSubject$.next(data);
      },
      () => {
        this.nextSubject$.next(null);
      },
    );
  }

  refresh(): void {
    this.stopLastRequest();
    this.stateSubject$.next([]);
    this.load(this.endPoint);
  }

  updateData(data: T[]): void {
    this.stateSubject$.next(data);
    this.countSubject$.next(data.length);
  }

  loadNext(): void {
    if (!this.loadingSubject$.getValue()) {
      this.load(this.nextSubject$.getValue());
    }
  }

  stopLastRequest(): void {
    if (this.lastReq) {
      this.lastReq.unsubscribe();
    }
  }

  private makeRequest(endPoint: string): Observable<HttpResponse<any>> {
    this.loadingSubject$.next(true);
    return this.db.load(endPoint).pipe(
      tap(() => this.loadingSubject$.next(false)),
      catchError(err => {
        this.loadingSubject$.next(false);
        return throwError(err);
      }),
    );
  }
}
