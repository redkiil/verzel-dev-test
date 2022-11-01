import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  registerUser(username: string, password: string) : Observable<string> {
    let HTTPOptions:Object = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      responseType: 'text'
    }
    const body=JSON.stringify({ "username": username, "password": password});
    return this.http.post<string>(`${environment.apiUrl}/Users`, body, HTTPOptions).pipe(map((r) => {
      return r;
    }))
  }
  loginUser(username: string, password: string) : Observable<string> {
    let HTTPOptions:Object = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      responseType: 'text'
    }
    const body=JSON.stringify({ "username": username, "password": password});
    return this.http.post<string>(`${environment.apiUrl}/Users/login`, body, HTTPOptions).pipe(map((r) => {
      return r;
    }))
  }
  public Logout() : void{
    localStorage.removeItem("token");
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if(!token)return false;
    return !this.jwtHelper.isTokenExpired(token);
  }
}
