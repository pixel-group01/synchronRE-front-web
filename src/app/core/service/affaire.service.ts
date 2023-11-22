import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class AffaireService {

  constructor(private restClient:RestClientService) { }

  // create = (body:any) => {
  //   return this.restClient.post('devises/create',body)
  // }

  getAll = () => {
    return this.restClient.get('affaires/facultative/all?withMaxSize=true');
  }

  getAffaireFacultatifStatistique = (data:any) => {
    return this.restClient.post('statistiques/affaires',data);
  }



  // getByCriteria = (index:number = 0,size:number=10,key?:string) => {
  //   let endPointFinal = "devises/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
  //   return this.restClient.get(endPointFinal);
  // }

  // update = (body:any) => {
  //   return this.restClient.put('devises/update',body)
  // }

}
