import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class TraiteNonProportionnelService {

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('traite-non-proportionnel/create',body)
  } 
 
  update = (body:any) => {
    return this.restClient.put('traite-non-proportionnel/update',body)
  }
  
  getAll = () => {
    return this.restClient.get('traite-non-proportionnel/search');
  }

  getListeTraiteNonProportionnel = (index:number = 0,size:number=10000,key?:string,cedId?:number,exeCode?:any) => {
    let endPointFinal = "traite-non-proportionnel/search?page="+index+"&size="+size+""+(key ? "&key="+key : "")+""+(exeCode ? "&exeCode="+exeCode : "");

    if(endPointFinal && cedId) {
      endPointFinal = endPointFinal+"&cedId="+cedId;
    }
    return this.restClient.get(endPointFinal);
  }

}