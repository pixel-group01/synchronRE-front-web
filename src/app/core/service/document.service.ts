import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';
import { typeDocument } from '../models/typeDocument';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private restClient:RestClientService) { }

  // create = (body:any) => {
  //   return this.restClient.post('pays/create',body)
  // } 

  typeDocument = () => {
    return this.restClient.get('documents/doc_sin/types');
  }
 
  // getByCriteria = (index:number = 0,size:number=10,key?:string) => {
  //   let endPointFinal = "pays/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
  //   return this.restClient.get(endPointFinal);
  // }

  // update = (body:any) => {
  //   return this.restClient.put('pays/update',body)
  // }
}
