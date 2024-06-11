import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class SousLimiteService {
  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('sous-limite/create',body)
  } 
 
  update = (body:any) => {
    return this.restClient.put('sous-limite/update',body)
  }
}