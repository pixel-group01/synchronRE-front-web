import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class ReassureurService {

  constructor(private restClient:RestClientService) { }

  getAll = (idTraitNonProChild: number) => {
    return this.restClient.get(`cessionnaires/by-traite-non-proportionnel/${idTraitNonProChild}`);
  }

}
 