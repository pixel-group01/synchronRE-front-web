import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import * as _ from "lodash";

@Directive({
  selector: '[appAppAccess]'
})
export class AppAccessDirective {

  @Input() appAccess: string ="";
  user : any = {};
  constructor(private el: ElementRef, private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
   
    // this.el.nativeElement.style.display = 'none';
    // if (!this.appAccess) {
    //   this.el.nativeElement.style.display = 'block';
    //   return;
    // }
    // if(!this.user  && this.user?.fonctionnalites  && this.user.fonctionnalites.length === 0) {
    //   return;
    // } 

    // // On verifie si le code de l'user a droit a cette fonctionnalité
    // let hasAcces = _.find(this.user.fonctionnalites, (o) => { return o.code?.trim().toLowerCase() == this.appAccess?.trim()?.toLowerCase() });
    
    // // if(this.appAccess === 'GEST-ADMINISTRATIVE-GESTION-VACATIONS-VACATION-ADD') {
    // //   console.log(" hasAcces ",hasAcces);
    // // }

    // // console.log(" this.appAccess ",this.appAccess);
    

    // if (hasAcces) {
    //   this.el.nativeElement.style.display = 'block';
    // }else {
    //   this.el.nativeElement.style.display = 'none';
    // }
  }


}
