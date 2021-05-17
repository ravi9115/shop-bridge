import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environment';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  get(url: string, isJsonResponse = true) {
    const options = this.setOptions(isJsonResponse);
    return this.http.get(environment.apiPath + url, options);
  }

  post(url: string, body: any, isJsonResponse = true) {
    const options = this.setOptions(isJsonResponse);
    return this.http.post(environment.apiPath + url, body, options);
  }

  put(url: string, body: any, isJsonResponse = true) {
    const options = this.setOptions(isJsonResponse);
    return this.http.put(environment.apiPath + url, body, options);
  }

  delete(url: string) {
    const options = this.setOptions(false);
    return this.http.delete(environment.apiPath + url, options);
  }

  options(url: string) {
    const options = this.setOptions(false);
    return this.http.options(environment.apiPath + url, options);
  }

  setOptions(isJsonResponse = false) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    let options = { ...headers };
    if (!isJsonResponse) {
      options = {
        ...options,
        observe: 'response',
        responseType: 'text',
      };
    }
    return options;
  }
}
