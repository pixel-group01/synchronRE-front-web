import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class ReglementService {

  constructor(private restClient:RestClientService) { }

  create = (typeReglement:string,body:any) => {
    return this.restClient.post(typeReglement+'/create',body)
  } 

  getAll = (typeReglement:string) => {
    return this.restClient.get(typeReglement+'/list');
  }
 
  getByCriteria = (index:number = 0,size:number=10,key?:string,typeReglement?:string) => {
    let endPointFinal = typeReglement+"/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  update = (typeReglement:string,body:any) => {
    return this.restClient.put(typeReglement+'/update',body)
  }
}
