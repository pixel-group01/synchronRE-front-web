import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ModalUpdatePasswordComponent } from "./modal-update-password/modal-update-password.component";
import { ModalForgotPasswordComponent } from "./modal-forgot-password/modal-forgot-password.component";
import { UserService } from "src/app/core/service/user.service";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: FormGroup;
  modalRef?: BsModalRef;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  password: any;
  isFirstConnexion : boolean = false;
  currentToken : string;
  isPassForget : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private utilities: UtilitiesService,
    private modalService: BsModalService,
    private userService: UserService
  ) {
    super();

       
    this.route.params.subscribe(params => {
      if (params['token']) {
        this.isFirstConnexion = true;
        this.currentToken = params['token'];
      }
    });
 
    console.log(" this.route ",this.route);
    console.log(" this.this.route.snapshot ",this.route.snapshot['_routerState']?.url);
    
    console.log(" this.route.snapshot['_routerState']?.url.includes('/authentication/forget-password/') ",this.route.snapshot['_routerState']?.url.includes('/authentication/forget-password/'));
    
    if(this.route.snapshot['_routerState']?.url.includes('/authentication/forget-password/')){
      this.isPassForget = true;
    }

  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  
  get f() {
    return this.authForm.controls;
  }
  // adminSet() {
  //   this.authForm.get("username").setValue("admin@hospital.org");
  //   this.authForm.get("password").setValue("admin@123");
  // }
  // doctorSet() {
  //   this.authForm.get("username").setValue("doctor@hospital.org");
  //   this.authForm.get("password").setValue("doctor@123");
  // }
  // patientSet() {
  //   this.authForm.get("username").setValue("patient@hospital.org");
  //   this.authForm.get("password").setValue("patient@123");
  // }

  onSubmit(password?) {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {
      this.password=this.f.password.value;

      // this.authService.login(this.f.username.value, this.f.password.value);

      // this.router.navigate(['/admin']);
      this.subs.sink = this.authService
        .login(this.f.username.value, password??this.f.password.value)
        .subscribe(
          (res:any) => {
            console.log('res',res);

            if(res && res.accessToken) {
              this.userService.setAuthToken(res);
              this.loading = false;
              this.router.navigate(['/admin']);
            }
            
            // this.router.navigate(['/admin']);
            // if (res && !res['hasError']) {
            //   console.log('res authxx',res);
            //   this.router.navigate(['/admin']);
            //   //naviguer en fonction des abilitation later
            //   // if(res && res.items && res.items.length && res.items[0].isFirstConnection){
            //   //   this.openModal(res.items[0])
            //   // }
            //   // else{
            //   //   this.openUniteFonctionnelleModal(res.items[0])
            //   // }
            //   this.loading = false;
              
              
            // } else {
              
            //   this.utilities.showNotification("snackbar-danger",
            //     this.utilities.formatMsgServeur(res['status']['message']),
            //     "bottom",
            //     "center");
            //   // this.error = res['status']['message'];
            //   this.loading = false;
            // }
          },
          (error) => {
            // this.error = error;
            console.log('error',error);
            
            this.submitted = false;
            this.loading = false;

            if(error && error.error)
            this.utilities.showNotification("snackbar-danger",
              error.error,
                "bottom",
                "center");
          }
        );
    }
  }

  openModal(data?,type?) {
    let modal:any
    modal = ModalUpdatePasswordComponent
    this.modalRef = this.modalService.show(modal, {
      id: 1,
      class: 'modal-custom',
      // data:boulangerie
    });
    if (data) this.modalRef.content.currentData = data;
    this.modalRef.onHide.subscribe((res) => {
      console.log('hidden');
      let pw = localStorage.getItem('newpw')
      console.log('pw: ',pw);
      if(pw)
        this.onSubmit(pw)
      // this.getData();

    });
  }

  forgotPassword(){
    let modal:any
    modal = ModalForgotPasswordComponent
    this.modalRef = this.modalService.show(modal, {
      id: 1,
      class: 'modal-custom',
      // data:boulangerie
    });
    // if (data) this.modalRef.content.currentData = data;
    this.modalRef.onHide.subscribe((res) => {
      console.log('hidden');
      // this.getData();
    });
  }

}
