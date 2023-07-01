import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  constructor(private restClient:RestClientService) { }

  create = (body:any) => {
    return this.restClient.post('privileges/create',body)
  } 

  getAll = () => {
    return this.restClient.get('privileges/search');
  }

  getPrivilegeGroupByType = () => {
    return this.restClient.get('privileges/grouped-by-type');
  }

  getPrivilegeByRoleId = (roleId:number) => {
    return this.restClient.get('privileges/privileges-for-roleIds?roleIds='+roleId);
  }

  getPrivilegeByRoleIds = (roleIds:number[]) => {

    let roleIdsCriteria = "roleIds=";

    roleIds.forEach((role,key) => {
      console.log(" role ",role);
      console.log(" key ",key);

      roleIdsCriteria = roleIdsCriteria+role;

      if(key < roleIds.length) {
        roleIdsCriteria = roleIdsCriteria+'&roleIds='
      }
    });
    return this.restClient.get('privileges/privileges-for-roleIds?'+roleIdsCriteria);
  }
 
  getByCriteria = (index:number = 0,size:number=10,key?:string) => {
    let endPointFinal = "privileges/list?page="+index+"&size="+size+""+(key ? "&key="+key : "");
    return this.restClient.get(endPointFinal);
  }

  update = (body:any) => {
    return this.restClient.put('privileges/update',body)
  }


  
}
