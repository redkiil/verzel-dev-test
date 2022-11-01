import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userService: UserService, private router: Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const AUTH_TOKEN = localStorage.getItem('token');
        const FORMAT_TOKEN = `Bearer ${AUTH_TOKEN}`;
        let newReq = req.clone({ setHeaders: { Authorization: FORMAT_TOKEN } });
        return next.handle(newReq);
    }
}