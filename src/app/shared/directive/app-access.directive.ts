import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import * as _ from "lodash";
import { UserService } from 'src/app/core/service/user.service';

@Directive({
  selector: '[appAppAccess]'
})
export class AppAccessDirective {

  @Input() appAccess: string ="";

  @Input() appAccessAdmin: string ="";
  @Input() appAccessCedente: string ="";

  user : any = {};
  constructor(private el: ElementRef, private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUserInfo();
   
    // Dans le cas ou c'est une cedenete
    // Et que access Admin est renseigné et que acees cedente n'est pas renseigné
    // Automatiquement on le cache

    // if(this.user && this.user.cedId){
    //    if(this.appAccessAdmin && !this.appAccessCedente){
    //     this.el.nativeElement.style.display = 'none';
    //    }
    // }
    

    // console.log(" appAccessAdmin ",this.appAccessAdmin);
    // console.log(" appAccessCedente ",this.appAccessCedente);

    // this.el.nativeElement.style.display = 'none';
    // if (!this.appAccess) {
    //   this.el.nativeElement.style.display = 'block';
    //   return;
    // }
    if(!this.user  && this.user?.authorities && this.user.authorities.length === 0) {
      return;
    } 

    // On verifie si le code de l'user a droit a cette fonctionnalité
    let hasAcces = _.find(this.user.authorities, (o) => { return o.trim().toLowerCase() == this.appAccess?.trim()?.toLowerCase() || (this.appAccessCedente ? o.trim().toLowerCase() == this.appAccessCedente?.trim()?.toLowerCase() : null) });
    
    if(this.appAccess === 'VAL-PLA') {
      console.log(" hasAcces de VAL-PLA",hasAcces);
    }

    // console.log(" this.appAccess ",this.appAccess);
    

    if (hasAcces) {
      this.el.nativeElement.style.display = 'block';
    }else {
      this.el.nativeElement.style.display = 'none';
    }
  }


}
