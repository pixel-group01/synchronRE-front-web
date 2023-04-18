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

    console.log(" request in interceptor jwrt ",request);
    
    console.log(" currentUser ",currentUser); 
    let headers: HttpHeaders = request?.headers;
    if (currentUser && currentUser.accessToken) {

      headers = headers.append('Authorization',`Bearer ${currentUser.accessToken}`);
      headers = headers.append('Content-Type', 'application/json');
      headers = headers.append('Access-Control-Allow-Methods', '*');
      headers = headers.append('Access-Control-Allow-Origin', '*');
      // request = request.clone({
      //   setHeaders: {
      //     Authorization: `Bearer ${currentUser.accessToken}`,
      //   },
      // });

       //  if(this.user && this.user.token) 
        //  {
        //     headers = headers.append('token', this.user.token);
        //  }

         request = request.clone({
                        headers: headers,
                        method: request.method,
                        body: request.body
                    });

    }

    return next.handle(request);
  }
}
