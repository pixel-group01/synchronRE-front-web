import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class PlacementTriterNonProService {

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('repartitions/traite-non-proportionnel/save',body)
  } 

  update = (body:any) => {
    return this.restClient.put('repartitions/traite-non-proportionnel/update',body)
  }

  getRpartepartie = (isTraiteNonPro :number) =>{
    return this.restClient.get(`traite-non-proportionnel/details/${isTraiteNonPro}`)
  }

}
