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

  getCalculRepartition = (body:any) => {
    return this.restClient.post('repartitions/calculate',body)
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

  updateRepartition = (body:any) => {
    return this.restClient.put('repartitions/update-cedante-legale',body)
  }

  modificationPlacement = (body:any) => {
    return this.restClient.put('repartitions/modifier-placement',body)
  }

  accepterPlacement = (body:any,repartitionId:number) => {
    return this.restClient.put('repartitions/accepter-placement/'+repartitionId,body)
  }
 
  transmissionNoteDeCession = (body:any,repartitionId:number) => {
    return this.restClient.put('repartitions/envoyer-note-cession-fac/'+repartitionId,body)
  }

  validerPlacement = (body:any,repartitionId:number) => {
    return this.restClient.put('repartitions/valider-placement/'+repartitionId,body)
  }

  sendNoteCession = (body:any,repartitionId:number) => {
    return this.restClient.put('repartitions/envoyer-note-cession-fac/'+repartitionId,body)
  }

  refuserPlacement = (body:any,repartitionId:number) => {
    return this.restClient.put('repartitions/refuser-placement/'+repartitionId,body)
  }

  retourPlacement = (body:any,repartitionId:number) => {
    return this.restClient.put('repartitions/retourner-placement/'+repartitionId,body)
  }

  transmettrePlacement = (body:any,repartitionId:number) => {
    return this.restClient.put('repartitions/transmettre-placement-pour-validation/'+repartitionId,body)
  }

  getRepartitionCessionLegaleParam = (affaireid:number = 0) => {
    let endPointFinal = "repartitions/ces-leg-param/"+affaireid;
    return this.restClient.get(endPointFinal);
  }

  getRepartitionCalculatTaux = (affaireId?:number,taux?:number,repIdToUpdate?:number) => {
    let endPointFinal = "repartitions/calculate/by-taux/"+affaireId+"/"+taux+(repIdToUpdate ? "?repIdToUpdate="+repIdToUpdate : '');
    return this.restClient.get(endPointFinal);
  }

  getRepartitionCalculatByTauxBesoin = (affaireId?:number,tauxBesoin?:number,repIdToUpdate?:number) => {
    let endPointFinal = "repartitions/calculate/by-taux-besoin/"+affaireId+"/"+tauxBesoin+(repIdToUpdate ? "?repIdToUpdate="+repIdToUpdate : '');
    return this.restClient.get(endPointFinal);
  }

  getRepartitionCalculatByCapital = (affaireId?:number,capital?:number,repIdToUpdate?:number) => {
    let endPointFinal = "repartitions/calculate/by-capital/"+affaireId+"/"+capital+(repIdToUpdate ? "?repIdToUpdate="+repIdToUpdate : '');
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

  getPlacementSaisieByAffaire = (index:number = 0,size:number=10,key?:string,affaireId?:number) => {
    let endPointFinal = "repartitions/list-placement-saisie/"+affaireId;
    endPointFinal = endPointFinal+"?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  getPlacementEnAttenteValidationByAffaire = (index:number = 0,size:number=10,key?:string,affaireId?:number) => {
    let endPointFinal = "repartitions/list-placement-en-attente-de-validation/"+affaireId;
    endPointFinal = endPointFinal+"?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  getPlacementValideByAffaire = (index:number = 0,size:number=10,key?:string,affaireId?:number) => {
    let endPointFinal = "repartitions/list-placement-valide/"+affaireId;
    endPointFinal = endPointFinal+"?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  reportNoteCessionPlacement(placementId:number){
    return this.restClient.get('reports/note-cession-fac/'+placementId);
  }

  getOldDataRepartition = (affaireId?:number) => {
    let endPointFinal = "repartitions/get-update-cedante-legal-dto/"+affaireId;
    return this.restClient.get(endPointFinal);
  }
  

}
