import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class CouvertureService {
  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('couvertures/create',body)
  } 

  getAll = () => {
    return this.restClient.get('couvertures/list');
  }

  getCouvertureParents =() =>{
    return this.restClient.get('couvertures/parents');
  }
 
  getByCriteria = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "couvertures/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  update = (body:any) => {
    return this.restClient.put('couvertures/update',body)
  }

  getParentCouverture = (traiteNpId:number) => {
    return this.restClient.get(`couvertures/parents/${traiteNpId}`)
  }
  
  getActivites = (traiteNpId:number,couParentId:number) => {
    return this.restClient.get(`couvertures/filles?traiteNpId=${traiteNpId}&couParentId=${couParentId}`)
  }
}
