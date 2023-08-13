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

  checkFonction(code):any{
    return this.currentUser.authorities.find((item:any)=> item == code);
  }


  create = (body:any) => {
    return this.restClient.post('sinistres/create',body)
  } 

  delete = (body:any) => {
    return this.restClient.post('sinistres/delete',body)
  } 

  histoSinist = (body:any)=>{
    return this.restClient.get('mouvements/sinistre/get-histo/'+`${body}`)
  }

  transmissionAuSouscripteur= (body:any) => {
    return this.restClient.put('sinistres/sinistres/transmettre-au-courtier/'+`${body}`);
  }

  transmissionAuValidateur= (body:any) => {
    return this.restClient.put('sinistres/transmettre-pour-validation/'+`${body}`);
  }

  retournerSinistre = (endPointRetourner?:string,body?:any) => {
    // let endPoint : any;
    // if (this.checkFonction('TRANS-SIN-VAL')) {
    //     endPoint = 'sinistres/retourner-au-souscripteur'
    // }else{
    //   if (this.checkFonction('TRANS-SIN-COMPTA')) {
    //     endPoint = 'sinistres/retourner-au-validateur'
    //   }else{
    //     if (this.checkFonction('SIN-TRAN')) {
    //       endPoint ='sinistres/retourner-a-cedante'
    //     }
    //   }
    // }
    return this.restClient.put(endPointRetourner,body);
  }

  messageCedante = (endPoint,body:any) => {
    return this.restClient.get(endPoint+`${body}`);
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