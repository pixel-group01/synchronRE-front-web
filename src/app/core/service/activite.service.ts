import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {
  constructor(private restClient:RestClientService) { }

  getAll = (idCouverture:number) => {
    return this.restClient.get(`couvertures/filles/${idCouverture}`);
  }

  getActivitesByRisque = (risqueId :number) => {
    return this.restClient.get(`risques/activites/${risqueId}`);
  }

}
