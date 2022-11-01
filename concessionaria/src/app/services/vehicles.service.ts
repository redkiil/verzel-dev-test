import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Vehicle } from '../models/Vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http: HttpClient) { }
  getAllVehicles(query: any, order: any) : Observable<Vehicle[]> {
    let HTTPOptions:Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    const body=JSON.stringify(query);
    return this.http.post<Vehicle[]>(`${environment.apiUrl}/Vehicles/list?by=${order.by}&order=${order.order}`, body, HTTPOptions);
  }
  getVehicle(id: number) : Observable<Vehicle> {
    return this.http.get<Vehicle>(`${environment.apiUrl}/Vehicles/${id}`);
  }
  uploadVehicle(data: any) : Observable<any> {
    let HTTPOptions:Object = {
      responseType: 'text'
    }
    var formData = new FormData();
    Object.keys(data.value).forEach((key)=>{
      formData.append(key,data.value[key])
    });
    return this.http.post(`${environment.apiUrl}/Vehicles`, formData, HTTPOptions);
  }
  updateVehicle(data: any, id: number) : Observable<any> {
    let HTTPOptions:Object = {
      responseType: 'text'
    }
    var formData = new FormData();
    Object.keys(data.value).forEach((key)=>{
      formData.append(key,data.value[key])
    });
    return this.http.put(`${environment.apiUrl}/Vehicles/${id}`, formData, HTTPOptions);
  }
  deleteVehicle(id: number) : Observable<any> {
    let HTTPOptions:Object = {
      responseType: 'text'
    }
    return this.http.delete(`${environment.apiUrl}/Vehicles/${id}`);
  }
}
