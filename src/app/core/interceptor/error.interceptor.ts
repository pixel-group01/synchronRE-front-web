import { AuthService } from "../service/auth.service";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UtilitiesService } from "../service/utilities.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService,private utilities: UtilitiesService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {

        console.log(" err ",err);
        
        if(err && !err?.message.includes('reports')){
          if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.authenticationService.logout();
            location.reload();
          }
  
          let error = err?.error || err?.error?.message || err?.statusText;
          
          // Je stringify en attendant que le backend ne trouve la solution
          if(error) {
            this.utilities.showNotification("snackbar-danger",JSON.stringify(error),"bottom","center");
            return throwError(error);
            // return;
          }
          else{
            if(err.statusText === 'Unknown Error') {
              error = "Connexion momentanement interronpue !";
            }
          }
        
          return throwError(error);

        }
       
      })
    );
  }
}
