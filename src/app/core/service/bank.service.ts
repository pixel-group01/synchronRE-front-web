import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private restClient:RestClientService,private http:HttpClient) { }

  create = (body:any) => {

    let dataToSend = {...body}
    return this.http
      .post<any>(`${environment.apiUrl}banques/create`, dataToSend)
      .pipe(
        map((response:any) => {
          return response;
        })
      );
  } 

  getAllBank = () => {

    //http://localhost:5001/banques/list?page=0&size=10&key=tes
    return this.http.get(environment.apiUrl+'banques/list?page=0&size=10&key=blala');
  }
 
  update = (body:any) => {
    return this.http.put(environment.apiUrl+'banques/update',body)
  }
}
