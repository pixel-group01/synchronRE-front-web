import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class AssiettePrimeService {

  constructor(private restClient:RestClientService) { }

  save = (body:any) => {
    return this.restClient.post('traite/cedantes/save',body)
  } 
 
}