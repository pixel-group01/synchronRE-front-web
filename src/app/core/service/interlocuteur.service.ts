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
    return this.restClient.get('interlocuteurs/list');
  }

  getInterlocuteurByCesId = (cesId:number) => {
    return this.restClient.get('interlocuteurs/list/'+cesId);
  }
 
  getByCriteria = (index:number = 0,size:number=10,key?:string,cesId?:number) => {
    let endPointFinal = "interlocuteurs/list/"+cesId+"?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }
  
  update = (body:any) => {
    return this.restClient.put('interlocuteurs/update',body)
  }

  getInterlocuteurByPlacement = (plaId:number) => {
    return this.restClient.get('interlocuteurs/for-placement/'+plaId)
  }

  addInterlocuteurByCessionnaire = (body:any) => {
    return this.restClient.put('interlocuteurs/update',body)
  }

  deleteItem = (id:number) => {
    return this.restClient.delete('interlocuteurs/delete-interlocuteur/'+id)
  }

}