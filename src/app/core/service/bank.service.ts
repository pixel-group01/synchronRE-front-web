import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('banques/create',body)
  } 

  getAll = () => {
    return this.restClient.get('banques/list');
  }
 
  getByCriteria = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "banques/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  update = (body:any) => {
    return this.restClient.put('banques/update',body)
  }
}
