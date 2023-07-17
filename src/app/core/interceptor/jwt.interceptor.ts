import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService,private userService:UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.userService.getCurrentToken(); // this.authenticationService.currentUserValue;

    let headers: HttpHeaders = request?.headers;
    if (request.body instanceof FormData) {
      // headers = headers.append('Content-Type', 'multipart/form-data');
    }
    if (currentUser && currentUser.accessToken) {

      headers = headers.append('Authorization',`Bearer ${currentUser.accessToken}`);
      headers = headers.append('Content-Type', 'application/json');
      // headers = headers.append('Content-Type', 'multipart/form-data');
      headers = headers.append('Access-Control-Allow-Methods', '*');
      headers = headers.append('Access-Control-Allow-Origin', '*');

         request = request.clone({
                        headers: headers,
                        method: request.method,
                        body: request.body
                    });

    }

    return next.handle(request);
  }
}
