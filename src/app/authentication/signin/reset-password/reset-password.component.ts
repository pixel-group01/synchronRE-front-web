import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  itemToSave : any = {};
  confirmnewPassword : any = {};
  loading = false;
  @Input() currentToken : any = {};
  @Input() isForgetPassword : boolean = false;

  constructor(
    private router: Router,
    private utilities: UtilitiesService,
    private userService: UserService
  ) { 

    console.log(" isForgetPassword ",this.isForgetPassword);
    
  }

  resetPassword() {


    /** Verifier si il a confirmer son mot de passe */
    if(this.itemToSave.newPassword != this.confirmnewPassword) {

      this.utilities.showNotification(
        "snackbar-danger",
        "Les deux mots de passe ne sont pas conforme !",
        "bottom",
        "center"
      );
      return
    }

    let request = {
        email: this.itemToSave.email,
        password: this.itemToSave.newPassword,
        confirmPassword: this.confirmnewPassword,
        activationToken: this.currentToken,
        newPassword: this.itemToSave.newPassword,
        confirmNewPassword: this.confirmnewPassword,
        passwordReinitialisationToken:this.currentToken
    }

    console.log(" request ",request);
    
    let endPoint = this.userService.activateAccount(request);

    if(this.isForgetPassword) {
      endPoint = this.userService.reinitPassword(request);
    }

    endPoint.subscribe(
      (response) => {
        if(response) {
          // Nous faisons une redirection sur 

          this.utilities.showNotification(
            "snackbar-success",
            "Votre mot de passe a été reinitialisé avec succès ! Vous pouvez vous connecter à votre espace.",
            "bottom",
            "center"
          );

          this.router.navigate(['/authentication']);
        }
      }

    )

  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["isForgetPassword"] &&
      changes["isForgetPassword"].currentValue
    ) {
      console.log(" isForgetPassword ",this.isForgetPassword);
    }
  }

  ngOnInit(): void {
  }

}
