import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class TypeParamCessService {

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('paramsCession/types',body)
  } 

  getAll = () => {
    return this.restClient.get('paramsCession/types');
  }
 
}
