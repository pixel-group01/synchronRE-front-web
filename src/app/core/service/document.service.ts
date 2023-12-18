import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';
import { typeDocument } from '../models/typeDocument';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private restClient:RestClientService) { }

  getAllDocOfSinistre = (body:any) => {
    return this.restClient.get('documents/sinistre/'+`${body}`)
  } 

  fileBase64 = (body:any) =>{
    return this.restClient.get('documents/get-base64-url/'+`${body}`)
  }

  modificationDoc = (body:any)=>{
    return this.restClient.put('documents/update', body)
  }

  typeDocument = () => {
    return this.restClient.get('documents/doc_sin/types');
  }

  typeDocumentAffaire = () => {
    return this.restClient.get('documents/doc_aff/types');
  }

  // typeDocumentSinistre = () => {
  //   return this.restClient.get('documents/DOC_SIN/types');
  // }

  typeDocumentPaiement = () => {
    return this.restClient.get('documents/doc_reg/types');
  }

  getDocumentByAffaire = (idAffaire : number) => {
    return this.restClient.get('documents/affaire/'+idAffaire);
  }

  getDocumentByPaiement = (regId : number) => {
    return this.restClient.get('documents/reglement/'+regId);
  }


  delete = (body:any) => {
    return this.restClient.delete('documents/delete/'+`${body}`);
  }
 
  // getByCriteria = (index:number = 0,size:number=10,key?:string) => {
  //   let endPointFinal = "pays/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
  //   return this.restClient.get(endPointFinal);
  // }

  create = (body:any) => {
    return this.restClient.post('documents/doc_sin/upload',body)
  }

  createDocAff = (body:any) => {
    return this.restClient.post('documents/doc_aff/upload',body)
  }

  createWithParameter = (body:any,typeEndPoint?:string) => {
    return this.restClient.post('documents/'+typeEndPoint+'/upload',body)
  }

  

}
