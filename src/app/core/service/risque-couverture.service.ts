import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class RisqueCouvertureService {

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('risques/create',body)
  } 

  update = (body:any) => {
    return this.restClient.put('risques/update',body)
  }
}
