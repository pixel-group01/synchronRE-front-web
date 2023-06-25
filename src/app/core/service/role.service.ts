import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('roles/create',body)
  } 

  getAll = () => {
    return this.restClient.get('roles/search');
  }
 
  getByCriteria = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "roles/search?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  update = (body:any) => {
    return this.restClient.put('roles/update',body)
  }
  
}
