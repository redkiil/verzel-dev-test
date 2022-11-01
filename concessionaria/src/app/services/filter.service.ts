import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Filter } from '../models/Filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) { }
  getFilterValues() : Observable<Filter> {
    return this.http.get<Filter>(`${environment.apiUrl}/Filter`);
  }
}
