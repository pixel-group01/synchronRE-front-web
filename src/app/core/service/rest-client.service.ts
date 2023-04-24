import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  url : any;
  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
   }

  get(endpoint: string, params?: any, options?: any) {
    return this.http.get(this.url + '' + endpoint,options);
  }

  post(endpoint:string, body: any, option ? : any){
    return this.http.post(this.url+''+endpoint,body,option).pipe(timeout(1000*60*3));
  }

  put(endpoint:string, body: any, option ? : any){
    return this.http.put(this.url+''+endpoint,body,option).pipe(timeout(1000*60*3));
  }

  delete(endpoint: string, params?: any, options?: any) {
    return this.http.delete(this.url + '' + endpoint,options);
  }


}
