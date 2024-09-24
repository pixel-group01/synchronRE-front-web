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

  getAllById = (traiteNpId:any) => {
    // return this.restClient.get('cedantes/list');
    return this.restClient.get(`traite/cedantes/a-saisir/${traiteNpId}`);
  }


  getAllTraite = (traiteNpId:number) => {
    return this.restClient.get(`traite/cedantes/list/${traiteNpId}`);
  }

  getCedanteParTraite = (body:any) => {
    return this.restClient.post("traite/cedantes/edit",body);
  }  

 
  getByCriteria = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "cedantes/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }
 
  update = (body:any) => {
    return this.restClient.put('cedantes/update',body)
  }
  
}
