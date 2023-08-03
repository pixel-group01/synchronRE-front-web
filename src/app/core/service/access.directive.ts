import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { UserService } from './user.service';


@Directive({
  selector: '[appAccess]'
})
export class AccessDirective implements OnInit {

  @Input() appAccess: string ="";

  constructor(private el: ElementRef, private auth: UserService,private userService: UserService) {
  }

  ngOnInit() {
    const user =  this.userService.getCurrentUserInfo();;

    console.log("user :",user);
    if(user && user.authorities && user.authorities.length>0 && user.menus && user.menus.length>0){
      console.log("user de acess directive ::", user);

      this.el.nativeElement.style.display = 'none';
      if (!this.appAccess) {
        this.el.nativeElement.style.display = 'block';
        return;
      }
      if(!user || user.menus.length === 0 || user.authorities.length === 0) {
        return;
      }
      let authorities = _.map(user.authorities, (p: any) => p) || [];
      if (_.indexOf(authorities, this.appAccess) > -1) {
        this.el.nativeElement.style.display = 'block';
      }
    }else{
      this.el.nativeElement.style.display = 'none';
    }
  }

}
