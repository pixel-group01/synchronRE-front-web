import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SinistreService {
  currentUser:any
  constructor(private restClient:RestClientService,
              private userService: UserService) { 
  this.currentUser  = this.userService.getCurrentUserInfo();
  }

  create = (body:any) => {
    return this.restClient.post('sinistres/create',body)
  } 

  delete = (body:any) => {
    return this.restClient.post('sinistres/delete',body)
  } 

  transmission = (body:any) => {
    return this.restClient.put('sinistres/transmettre-pour-validation/'+`${body}`);
  }

  retournerCedante = (body:any) => {
    return this.restClient.put('sinistres/retourner-a-cedante',body);
  }

  retournerSouscripteur = (body:any) => {
    return this.restClient.put('sinistres/retourner-au-souscripteur',body);
  }

  retournerValidateur = (body:any) => {
    return this.restClient.put('sinistres/retourner-au-validateur',body);
  }

  messageCedante = (body:any) => {
    return this.restClient.get('mouvements/sinistre/get-message-retour-souscripteur/'+`${body}`);
  }

  messageSouscripteur = (body:any) => {
    return this.restClient.get('mouvements/sinistre/get-message-retour-validateur/'+`${body}`);
  }

  messageValidateur = (body:any) => {
    return this.restClient.get('mouvements/sinistre/get-message-retour-comptable/'+`${body}`);
  }


  validation = (body:any) => {
    return this.restClient.put('sinistres/valider/'+`${body}`);
  }

  etatComptable = (body:any) => {
    return this.restClient.get('sinistres/etat-comptable/'+`${body}`);
  }

  getReglementDetailsBySinistreAndCessionnaire = (cesId:number,sinistreId:number) => {
    return this.restClient.get('paiements/sinistre/details?sinId='+sinistreId+'&cesId='+cesId);
  }

  getReglementBySinitres = (idSinistre:any) => {
    return this.restClient.get("paiements/sinistre/list/"+idSinistre);
  }

  listePaiemenOrReglementSinistre = (body:any) => {
    return this.restClient.get(body);
  }

  messageRetour=(body)=>{
    let endPoint :any
    return this.restClient.get(endPoint+`${body}`)
  }

 

  update = (body:any) => {
    return this.restClient.put('sinistres/update',body)
  }

}