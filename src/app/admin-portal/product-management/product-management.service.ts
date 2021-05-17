import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductManagementService {
  constructor(private api: HttpClient) {}

  load(apiEndPoint: string) {
    return this.api.get<any>(apiEndPoint, { observe: 'response' });
  }
}
