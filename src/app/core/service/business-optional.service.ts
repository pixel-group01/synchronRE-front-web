import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessOptionalService {

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('affaires/facultative/create',body)
  } 

  getAll = () => {
    return this.restClient.get('affaires/facultative/list');
  }
 
  getByCriteria = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "affaires/facultative/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  update = (body:any) => {
    return this.restClient.put('affaires/facultative/update',body)
  }

}
