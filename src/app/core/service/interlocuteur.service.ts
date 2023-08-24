import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class InterlocuteurService {

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('interlocuteurs/create',body)
  } 

  getAll = () => {
    return this.restClient.get('cessionnaires/list');
  }

  // getInterlocuteur = (cesId:number) => {
  //   return this.restClient.get('cessionnaires/getInterlocuteur?cesId='+cesId);
  // }
 
  getByCriteria = (index:number = 0,size:number=10,key?:string,intId?:number) => {
    let endPointFinal = "interlocuteurs/list/"+intId+"?page="+index+"&size="+size+""+(key ? "&key="+key : "");
  
    return this.restClient.get(endPointFinal);
  }

  // getCessionnaireByAffaire = (idAffaire:number) => {
  //   let endPointFinal = "cessionnaires/by-affaire/"+idAffaire;
  //   return this.restClient.get(endPointFinal);
  // }
  
  update = (body:any) => {
    return this.restClient.put('interlocuteurs/update',body)
  }

  delete = (body:any) => {
    return this.restClient.delete('interlocuteurs/delete-interlocuteur/'+body)
  }
}
