import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { enumStatutFonction } from 'src/app/core/enumerator/enumerator';
import { UserSynchroRE } from 'src/app/core/models/userSynscroRE';
import { AuthService } from 'src/app/core/service/auth.service';
import { FonctionService } from 'src/app/core/service/fonction.service';
import { PrivilegeService } from 'src/app/core/service/privilege.service';
import { RoleService } from 'src/app/core/service/role.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-select-fonction',
  templateUrl: './select-fonction.component.html',
  styleUrls: ['./select-fonction.component.scss']
})
export class SelectFonctionComponent implements OnInit {

  statutFonction : any = {};
  busySubscription : Subscription;
  currentUser: UserSynchroRE;
  listeFonctionsActivesByUser : any = [];
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private privilegeService: PrivilegeService,
    private roleService: RoleService,
    private fonctionService: FonctionService,
    private userService: UserService,
    private router: Router
  ) { 
    this.currentUser = this.userService.getCurrentUserInfo();
    this.statutFonction = enumStatutFonction;
  }

  getFonctionActive() {
    this.busySubscription = this.fonctionService.getFunctionActiveByUser(this.currentUser.userId).subscribe(
      (response) => {
        console.log(" response ",response);
        this.listeFonctionsActivesByUser = response;
      }
    )
  }

  selectFonction(currentFonction){
    console.log(" currentFonction ",currentFonction);
    this.busySubscription = this.fonctionService.setDefaultFunction(currentFonction.id).subscribe(
      (response : any) => {
        console.log(" response ",response);
        // On le ramene sur le tableau de bord pour mieux gerer les acls
        if(response && response.accessToken) {
          this.userService.setAuthToken(response);
          this.router.navigate(['/admin']);
          this.closeModal.emit(true);
        }
      }
    )
  }

  ngOnInit(): void {
    this.getFonctionActive();
  }

}
