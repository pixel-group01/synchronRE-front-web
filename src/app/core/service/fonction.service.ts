import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class FonctionService {

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('statuts/create',body)
  } 

  getDetailsInfoFonctionForUser = (idUser:number) => {
    return this.restClient.get('functions/all-fnc-for-user/'+idUser);
  }
 
  getByCriteria = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "statuts/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  update = (body:any) => {
    return this.restClient.put('functions/update',body)
  }


}
