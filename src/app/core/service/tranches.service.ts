import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class TranchesService {

  constructor(private restClient:RestClientService) { }

  save = (body:any) => {
    return this.restClient.post('tranches/save',body)
  } 

  getAll = (traiteNpId:number)=>{
    return this.restClient.get(`tranches/list/${traiteNpId}`)
  }

}