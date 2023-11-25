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

  affaireStatistiquesExercices = () => {
    return this.restClient.get('statistiques/exercices');
  }

  affaireStatistiquesCedantes= () => {
    return this.restClient.get('statistiques/cedantes');
  }

  affaireStatistiquesDevises = () => {
    return this.restClient.get('statistiques/devises');
  }

  affaireStatistiquesCouvertures= () => {
    return this.restClient.get('statistiques/couvertures');
  }

  affaireStatistiquesstatuts = () => {
    return this.restClient.get('statistiques/statuts');
  }

  // getByCriteria = (index:number = 0,size:number=10,key?:string) => {
  //   let endPointFinal = "devises/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
  //   return this.restClient.get(endPointFinal);
  // }

  // update = (body:any) => {
  //   return this.restClient.put('devises/update',body)
  // }

}
