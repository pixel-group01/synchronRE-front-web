import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root' 
})
export class CedanteService {

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('cedantes/create',body)
  } 

  getAll = () => {
    return this.restClient.get('cedantes/list');
  }

  getAllTraite = (traiteNpId:number) => {
    return this.restClient.get(`traite/cedantes/list/${traiteNpId}`);
  }

  getCedanteParTraite = (traiteNpId :number ,cedId:number) => {
    return this.restClient.get(`traite/cedantes/edit?traiteNpId=${traiteNpId}&cedId=${cedId}`);
  }
 
  getByCriteria = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "cedantes/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }
 
  update = (body:any) => {
    return this.restClient.put('cedantes/update',body)
  }
  
}
