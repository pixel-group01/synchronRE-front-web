import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class ReconstitutionService {

  constructor(private restClient:RestClientService) { }

  save = (body:any) => {
    return this.restClient.post('reconstitutions/save',body)
  } 
 
}