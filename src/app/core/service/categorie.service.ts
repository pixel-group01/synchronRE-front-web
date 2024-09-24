import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('categories/save',body)
  } 

  getCategorieList = (body:any) =>{
    return this.restClient.get(`categories/list/${body}`)
  }
 
  // update = (body:any) => {
  //   return this.restClient.put('cedantes/update',body)
  // }
}