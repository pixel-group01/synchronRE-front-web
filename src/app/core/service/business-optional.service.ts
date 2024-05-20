import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';
import { BehaviorSubject } from 'rxjs';
import { BusinessOptional } from '../models/businessOptional';

@Injectable({
  providedIn: 'root'
})
export class BusinessOptionalService {

  /* Observable pour la création d'une aaffaire */
  businessOptionalSubject$ = new BehaviorSubject<BusinessOptional>(new BusinessOptional);
  businessObservable = this.businessOptionalSubject$.asObservable();

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('affaires/facultative/create',body)
  }

  getAll = () => {
    return this.restClient.get('affaires/facultative/list');
  }

  // getAffaireForStatistique = () => {
  //   return this.restClient.get('affaires/facultative/all');
  // }

  getAffaireForStatistique = (index:number = 0,size:number=10000,key?:string,cedId?:number,exeCode?:any) => {
    let endPointFinal = "affaires/facultative/all?page="+index+"&size="+size+""+(key ? "&key="+key : "")+""+(exeCode ? "&exeCode="+exeCode : "");

    if(endPointFinal && cedId) {
      endPointFinal = endPointFinal+"&cedId="+cedId;
    }
    return this.restClient.get(endPointFinal);
  }

  getByCriteria = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "affaires/facultative/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  getMouvementAffaire = (affId?:number) => {
    let endPointFinal = "mouvements/affaire/"+affId;
    return this.restClient.get(endPointFinal);
  }

  update = (body:any) => {
    return this.restClient.put('affaires/facultative/update',body)
  }

  getAffaireFacultativeByReassureurEnTraitement = (index:number = 0,size:number=10,key?:string,cedId?:number,exeCode?:any) => {
    let endPointFinal = "affaires/facultative/by-reassureur-en-traitement?page="+index+"&size="+size+""+(key ? "&key="+key : "")+""+(exeCode ? "&exeCode="+exeCode : "");

    if(endPointFinal && cedId) {
      endPointFinal = endPointFinal+"&cedId="+cedId;
    }
    return this.restClient.get(endPointFinal);
  }

  getAffaireFacultativeByReassureurEnPlacement = (index:number = 0,size:number=10,key?:string,cedId?:number,exeCode?:any) => {
    let endPointFinal = "affaires/facultative/by-reassureur-en-placement?page="+index+"&size="+size+""+(key ? "&key="+key : "")+""+(exeCode ? "&exeCode="+exeCode : "");

    if(endPointFinal && cedId) {
      endPointFinal = endPointFinal+"&cedId="+cedId;
    }
    return this.restClient.get(endPointFinal);
  }

  getAffaireFacultativeByReassureurValide = (index:number = 0,size:number=10,key?:string,cedId?:number) => {
    let endPointFinal = "affaires/facultative/by-reassureur-valide?page="+index+"&size="+size+""+(key ? "&key="+key : "");

    if(endPointFinal && cedId) {
      endPointFinal = endPointFinal+"&cedId="+cedId;
    }
    return this.restClient.get(endPointFinal);
  }

  getDetailsAffaireFacultative = (affId:number) => {
    let endPointFinal = "affaires/facultative/details/"+affId;
    return this.restClient.get(endPointFinal);
  }

  getAffaireFacultativeEtatComptable = (affId:number) => {
    let endPointFinal = "affaires/facultative/etat-comptable/"+affId;
    return this.restClient.get(endPointFinal);
  }

  getAffaireFacultativeByUser = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "affaires/facultative/by-user?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  getAffaireFacultativeByUserArchive = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "affaires/facultative/by-user-arch?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  getAffaireFacultativeByFunction = (index:number = 0,size:number=10,key?:string,exeCode?:any) => {
    let endPointFinal = "affaires/facultative/by-function?page="+index+"&size="+size+""+(key ? "&key="+key : "")+""+(exeCode ? "&exeCode="+exeCode : "");
    return this.restClient.get(endPointFinal);
  }

  getAffaireFacultativeByFunctionArch = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "affaires/facultative/by-function-arch?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  getAffaireFacultativeByCedante = (index:number = 0,size:number=10,key?:string,exeCode?:any) => {
    let endPointFinal = "affaires/facultative/by-cedante?page="+index+"&size="+size+""+(key ? "&key="+key : "")+""+(exeCode ? "&exeCode="+exeCode : "");
    return this.restClient.get(endPointFinal);
  }

  getAffaireFacultativeByCedanteTransmis = (index:number = 0,size:number=10,key?:string,exeCode?:any) => {
    let endPointFinal = "affaires/facultative/by-cedante-transmis?page="+index+"&size="+size+""+(key ? "&key="+key : "")+""+(exeCode ? "&exeCode="+exeCode : "");
    return this.restClient.get(endPointFinal);
  }

  getAffaireFacultativeByCedanteEnReglement = (index:number = 0,size:number=10,key?:string,exeCode?:any) => {
    let endPointFinal = "affaires/facultative/by-cedante-en-reglement?page="+index+"&size="+size+""+(key ? "&key="+key : "")+""+(exeCode ? "&exeCode="+exeCode : "");
    return this.restClient.get(endPointFinal);
  }

  getAffaireFacultativeByReassureurEnReglement = (index:number = 0,size:number=10,key?:string,cedId?:number,exeCode?:any) => {
    let endPointFinal = "affaires/facultative/by-reassureur-en-reglement?page="+index+"&size="+size+""+(key ? "&key="+key : "")+""+(exeCode ? "&exeCode="+exeCode : "");
    if(endPointFinal && cedId) {
      endPointFinal = endPointFinal+"&cedId="+cedId;
    }

    return this.restClient.get(endPointFinal);
  }

  getAffaireFacultativeByCedanteArchive = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "affaires/facultative/by-cedante-arch?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  setCurrentOptionalBusiness(businessOptional: BusinessOptional) {
    this.businessOptionalSubject$.next(businessOptional);
  } 

  transmissionAffaire = (idAffaire:number,body:any) => {
    return this.restClient.put('affaires/facultative/transmettre/'+idAffaire,body)
  }

  validerAffaire = (idAffaire:number,body:any) => {
    return this.restClient.put('affaires/facultative/valider/'+idAffaire,body)
  }

  envoyerNoteCession = (idAffaire:number,body:any) => {
    return this.restClient.put('affaires/envoyer-note-debit-fac/'+idAffaire,body)
  }

  retournerAffaire = (body:any) => {
    return this.restClient.put('affaires/facultative/retourner',body)
  }

  archiverAffaire = (idAffaire:number,body:any) => {
    return this.restClient.put('affaires/facultative/archiver/'+idAffaire,body)
  }

  getMessageRetour = (affId:number) => {
    return this.restClient.get('mouvements/affaire/message-retour/'+affId)
  }

  getReportNoteDebit = (affId:number) => {
    return this.restClient.get('reports/note-de-debit-fac/'+affId)
  }

}
