import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class TeritorrialiteService {
  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('territorialites/create',body)
  }

  update = (body:any) => {
    return this.restClient.put('territorialites/update',body)
  }

}