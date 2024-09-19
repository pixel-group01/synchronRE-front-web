import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class RisqueService {

  constructor(private restClient:RestClientService) { }

  getAll = (traiteNpId :number) => {
    return this.restClient.get(`risques/list/${traiteNpId}`);
  }

  getCouvertureParents = (traiteNpId :number) => {
    return this.restClient.get(`risques/couvertureParent/${traiteNpId}`);
  }


}
