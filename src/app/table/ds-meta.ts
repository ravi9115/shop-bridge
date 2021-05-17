import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TableDataBase {
  load(endPoint: string): Observable<HttpResponse<any>>;
}
