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


  saveCompte = (body:any) => {
    return this.restClient.post('comptes/traites/save',body)
  } 

  getCompteTraite = (body:any) => {
    return this.restClient.post('comptes/traites',body)
  }

  exportCompteTraite = (traiteNpId:number,cedanteId:number,trancheId:number,periodicite:string,periodeId : number) => {
    return this.restClient.get("reports/compte-traites/download-excel?traitenpId="+traiteNpId+"&cedenteId="+cedanteId+"&trancheId="+trancheId+"&periodicite="+periodicite+"&periodeId="+periodeId+"")
  } 

  getPeriodicite = () => {
    return this.restClient.get('comptes/periodicites');
  }
 
  getCompteByTraiteId = (idTraite,idPeriode) => {
    return this.restClient.get('comptes/traites/'+idTraite+'/'+(idPeriode ? idPeriode : ''));
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
