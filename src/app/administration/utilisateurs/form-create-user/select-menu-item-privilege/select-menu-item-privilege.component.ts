import { Component, OnInit } from '@angular/core';
import { privilegeSynchroRE } from 'src/app/core/models/privilegeSynscroRE';
import { PrivilegeService } from 'src/app/core/service/privilege.service';

@Component({
  selector: 'app-select-menu-item-privilege',
  templateUrl: './select-menu-item-privilege.component.html',
  styleUrls: ['./select-menu-item-privilege.component.scss']
})
export class SelectMenuItemPrivilegeComponent implements OnInit {

  listePrivileges : Array<privilegeSynchroRE> = [];
  listePrivilegesSelected :  Array<privilegeSynchroRE> = [];

  constructor(private privilegeService: PrivilegeService) { }

  getPrivilege() {
    this.privilegeService.getAll().subscribe((response: any) => {
      if (response && response["content"]) {
        this.listePrivileges = response["content"] as privilegeSynchroRE[];
      } else {
        this.listePrivileges = [];
      }
    });
  }

  addPrivilegeBoxRight(privilege : privilegeSynchroRE,indice:number){
    this.listePrivilegesSelected.push(privilege);
    this.listePrivileges.splice(1,indice);
  }

  removePrivilegeBoxRight(privilege : privilegeSynchroRE,indice:number){
    this.listePrivileges.push(privilege);
    this.listePrivilegesSelected.splice(1,indice);
  }

  ngOnInit(): void {
    this.getPrivilege();
  }

}
