import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReglementService {

  constructor(private restClient:RestClientService) { }

  create = (typeReglement:string,body:any,option:any): Observable<any> => {
    console.log(" body ",body);
    
    return this.restClient.post(typeReglement+'/create',body,option)
  } 

  getAll = (typeReglement:string) => {
    return this.restClient.get(typeReglement+'/list');
  }

  getReglementByAffaire = (typeReglement:string,affId:number) => {
    return this.restClient.get(typeReglement+'/list/'+affId);
  }
 
  getByCriteria = (index:number = 0,size:number=10,key?:string,typeReglement?:string) => {
    let endPointFinal = typeReglement+"/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  update = (typeReglement:string,body:any) => {
    return this.restClient.put(typeReglement+'/update',body)
  }
}