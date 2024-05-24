import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  constructor(private restClient:RestClientService) { }

  getAllFiltre = (endPointFinal:string) => {
    return this.restClient.get(endPointFinal);
  }

  getAll = () => {
    return this.restClient.get("pays/list");
  }

  getPaysConcerner = (traiteNpId :Number) => {
    return this.restClient.get(`categories/list/${traiteNpId}`);
  }
 
}
