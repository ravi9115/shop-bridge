/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiConfig } from '../helpers';
import { ProductDTO } from '../models';
import { HttpService } from './http.service';

const catchAndThrow = (source$: Observable<any>) =>
  source$.pipe(catchError((error: any) => throwError(error || 'Server error')));

@Injectable()
export class RequestFactory {
  constructor(private service: HttpService) {}

  addProduct(params: Partial<ProductDTO>): Observable<ProductDTO> {
    return this.service.post(`${ApiConfig.productManagement}/`, params).pipe(catchAndThrow);
  }

  deleteProduct(productId: number): Observable<ProductDTO> {
    return this.service.delete(`${ApiConfig.productManagement}/${productId}/`).pipe(catchAndThrow);
  }

  updateProduct(productId: number, params: Partial<ProductDTO>): Observable<ProductDTO> {
    return this.service
      .put(`${ApiConfig.productManagement}/${productId}`, params)
      .pipe(catchAndThrow);
  }
}
