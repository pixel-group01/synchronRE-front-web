import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class CessionnaireService {

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('cessionnaires/create',body)
  } 

  getAll = () => {
    return this.restClient.get('cessionnaires/list');
  }

  getInterlocuteur = (cesId:number) => {
    return this.restClient.get('cessionnaires/getInterlocuteur?cesId='+cesId);
  }
 
  getByCriteria = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "cessionnaires/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  getCessionnaireByAffaire = (idAffaire:number) => {
    let endPointFinal = "cessionnaires/by-affaire/"+idAffaire;
    return this.restClient.get(endPointFinal);
  }
  
  update = (body:any) => {
    return this.restClient.put('cessionnaires/update',body)
  }
  
}
