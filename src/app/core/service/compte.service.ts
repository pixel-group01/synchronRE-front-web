import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('pays/create',body)
  } 

  getPeriodicite = () => {
    return this.restClient.get('comptes/periodicites');
  }
 
  getCompteByTraiteId = (id) => {
    return this.restClient.get('comptes/traites/'+id);
  }

  getPeriode = (exercieCode,typeId) => {
    return this.restClient.get('comptes/periodes?exeCode='+exercieCode+'&typeId='+typeId);
  }

  getByCriteria = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "pays/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  update = (body:any) => {
    return this.restClient.put('pays/update',body)
  }

}
