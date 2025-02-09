import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

 constructor(private restClient:RestClientService) { }

  getAll = (
    endPoint: string,
    exeCode?: number,
    cedId?: any,
    cesId?: any,
    statusEnvoie?: string,
    statutEncaissement?: string,
    debut?: any,
    fin?: any,
    page?: any,
    size?: any
  ) => {
    const params: any = {};
  
    if (exeCode) params.exeCode = exeCode;
    if (cedId) params.cedId = cedId;
    if (cesId) params.cesId = cesId;
    if (statusEnvoie) params.statutEnvoie = statusEnvoie;
    if (statutEncaissement) params.statutEncaissement = statutEncaissement;
    if (debut) params.debut = debut;
    if (fin) params.fin = fin;
    if (page) params.page = page;
    if (size) params.size = size;
  
    // Générer la query string automatiquement
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${endPoint}?${queryString}` : endPoint;
  
    return this.restClient.get(fullUrl);
  };
  
  exerDash = ()=>{
    return this.restClient.get("exercices/list");
  }
  cedDash = ()=>{
    return this.restClient.get("cedantes/list");
  }
  reasDash = ()=>{
    return this.restClient.get("cessionnaires/list");
  }
  statDash= ()=>{
    return this.restClient.get("");
  }
  statEncaisDash= ()=>{
    return this.restClient.get("");
  }

  imprim = (exeCode?:number, cedId ?:number, statusEnvoie?:string, statutEncaissement?:string)=>{
    return this.restClient.get("reports/situation-note-debit-par-cedante?exeCode="+exeCode+"&cedId="+
            cedId+"&statutEnvoie="+statusEnvoie+"&statutEncaissement="+statutEncaissement);
  }
}
