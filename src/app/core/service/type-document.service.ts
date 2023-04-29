import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class TypeDocumentService {

  constructor(private restClient:RestClientService) { }

  getTypeDocument = (typeReglement : string) => {
    return this.restClient.get(typeReglement+'/type-documents');
  }

}
