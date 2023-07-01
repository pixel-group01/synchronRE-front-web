import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class SinistreService {


  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('sinistres/create',body)
  } 

  delete = (body:any) => {
    return this.restClient.post('sinistres/delete',body)
  } 

  transmission = (body:any) => {
    return this.restClient.put('sinistres/transmettre/'+`${body}`);
  }

  validation = (body:any) => {
    return this.restClient.put('sinistres/facultatives/valider',body);
  }

  retourner = (body:any) => {
    return this.restClient.put('sinistres/facultatives/retourner',body);
  }
 
  // getByCriteria = (index:number = 0,size:number=10,key?:string) => {
  //   let endPointFinal = "devises/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
  //   return this.restClient.get(endPointFinal);
  // }

  update = (body:any) => {
    return this.restClient.put('sinistres/update',body)
  }

}