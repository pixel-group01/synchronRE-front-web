import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private restClient:RestClientService) { }
  
  create = (body:any) => {
    return this.restClient.post('logs/create',body)
  } 

  getAll = () => {
    return this.restClient.get('logs/search');
  }
 
  getHistoryConnexion = (index:number = 0,size:number=10,key?:string,userId?:number) => {
    let endPointFinal = "logs/connexion-list?page="+index+"&size="+size+""+(key ? "&key="+key : ""+(userId ? "userId="+userId : ""));
    return this.restClient.get(endPointFinal);
  }

  getLogsByConnexion = (index:number = 0,size:number=10,key?:string,userId?:number,connectionId?:string) => {
    let endPointFinal = "logs/connexion-actions?page="+index+"&size="+size+""+(key ? "&key="+key : ""+(userId ? "&userId="+userId : "")+(connectionId ? "&connId="+connectionId : ""));
    return this.restClient.get(endPointFinal);
  }


}
