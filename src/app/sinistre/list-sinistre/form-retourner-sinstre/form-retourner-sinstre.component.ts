import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { SinistreService } from 'src/app/core/service/sinistre.service';
import { UserService } from 'src/app/core/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-retourner-sinstre',
  templateUrl: './form-retourner-sinstre.component.html',
  styleUrls: ['./form-retourner-sinstre.component.scss']
})
export class FormRetournerSinstreComponent implements OnInit {
  @Input() idSinistre : number;
  retourneForm:FormGroup;
  currentUser:any;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sinistreService: SinistreService) { }

  ngOnInit(): void {
    this.retourForm();
    this.currentUser  = this.userService.getCurrentUserInfo();
  }
  
  retourForm = () =>{
    this.retourneForm = this.formBuilder.group({
      description: ["",Validators.required],
    })
  }

  confirmRetournerSinistre(item:any) {
    console.log("idSinistre :",this.idSinistre);
    Swal.fire({
      title: "Retourner un sinistre",
      text:"Vous êtes sur le point de retourner un sinistre. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue une transmission de sinistre
        this.retournerSinistre(item);
        // this.retournerSinistreSouscripteur(item);
        // this.retournerSinistreValidateur(item)
      }
    });
  }

  annuler(){
      this.retourneForm.reset()
  }

  retournerSinistre(item?: any) {
    const data = {
      objectId: this.idSinistre,
      mvtObservation: item.description
    } 
    this.sinistreService.retournerCedante(data).subscribe((res: any) => {
        console.log('ok pour mon form de retouner');
        this.closeModal.emit(true);
    })
  }

  retournerSinistreSouscripteur(item?: any) {
    const data = {
      objectId: this.idSinistre,
      mvtObservation: item.description
    } 
    this.sinistreService.retournerSouscripteur(data).subscribe((res: any) => {
        console.log('ok pour mon form de retouner');
        this.closeModal.emit(true);
    })
  }

  retournerSinistreValidateur(item?: any) {
    const data = {
      objectId: this.idSinistre,
      mvtObservation: item.description
    } 
    this.sinistreService.retournerValidateur(data).subscribe((res: any) => {
        console.log('ok pour mon form de retouner');
        this.closeModal.emit(true);

    })
  }

}
