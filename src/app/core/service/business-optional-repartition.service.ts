import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessOptionalRepartitionService {

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('repartitions/create',body)
  } 

  createPlacement = (body:any) => {
    return this.restClient.post('repartitions/create-placement',body)
  } 

  getAll = () => {
    return this.restClient.get('repartitions/list');
  }
 
  getByCriteria = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "repartitions/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  update = (body:any) => {
    return this.restClient.put('repartitions/update',body)
  }

  getRepartitionCessionLegaleParam = (affaireid:number = 0) => {
    let endPointFinal = "repartitions/ces-leg-param/"+affaireid;
    return this.restClient.get(endPointFinal);
  }

  getRepartitionCalculatTaux = (affaireId?:number,taux?:number) => {
    let endPointFinal = "repartitions/calculate/by-taux/"+affaireId+"/"+taux;
    return this.restClient.get(endPointFinal);
  }

  getRepartitionCalculatByTauxBesoin = (affaireId?:number,tauxBesoin?:number) => {
    let endPointFinal = "repartitions/calculate/by-taux-besoin/"+affaireId+"/"+tauxBesoin;
    return this.restClient.get(endPointFinal);
  }

  getRepartitionCalculatByCapital = (affaireId?:number,capital?:number) => {
    let endPointFinal = "repartitions/calculate/by-capital/"+affaireId+"/"+capital;
    return this.restClient.get(endPointFinal);
  }

  createCedanteLegaleRepartition = (body:any) => {
    return this.restClient.post('repartitions/create-cedante-legale-repartition',body)
  } 

  deleteRepartitionPlacement = (idRepartition:any) => {
    return this.restClient.delete('repartitions/delete-placement/'+idRepartition);
  } 

  getPlacementByAffaire = (index:number = 0,size:number=10,key?:string,affaireId?:number) => {
    let endPointFinal = "repartitions/list-placement/"+affaireId;

    endPointFinal = endPointFinal+"?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  reportNoteCessionPlacement(placementId:number){
    return this.restClient.get('reports/note-cession/'+placementId);
  }

}
