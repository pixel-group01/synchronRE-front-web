import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class LimiteSouscriptionService {
  constructor(private restClient:RestClientService) { }

  save = (body:any) => {
    return this.restClient.post('limitesouscription/save',body)
  } 

  // getAll = () => {
  //   return this.restClient.get('banques/list');
  // }
 
  // getByCriteria = (index:number = 0,size:number=10,key?:string) => {
  //   let endPointFinal = "banques/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
  //   return this.restClient.get(endPointFinal);
  // }


}