import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SinistreService } from 'src/app/core/service/sinistre.service';
import { UserService } from 'src/app/core/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-afficher-message',
  templateUrl: './afficher-message.component.html',
  styleUrls: ['./afficher-message.component.scss']
})
export class AfficherMessageComponent implements OnInit {
  @Input() idSinistre : number;
  messageForm:FormGroup;
  // currentUser:any;
  description:any
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();


  constructor(
    private userService: UserService,
    private sinistreService: SinistreService) { }

  ngOnInit(): void {
    this.messageCedante()
    // this.currentUser  = this.userService.getCurrentUserInfo();
  }

  messageCedante() {
    console.log("idSinistre :",this.idSinistre);
    this.sinistreService.messageCedante(this.idSinistre).subscribe((res: any) => {
        if(res){
          this.description = res.message;
          console.log('message res ::',res.message,this.description);
        }
    })
  }

  fermer(){
        this.closeModal.emit(true);
  }

  messageSouscripteur() {
    console.log("idSinistre :",this.idSinistre);
    this.sinistreService.messageSouscripteur(this.idSinistre).subscribe((res: any) => {
      if(res){
        console.log('message res ::',res);
      }
   })
  }

  messageValidateur() {
    console.log("idSinistre :",this.idSinistre);
    this.sinistreService.messageValidateur(this.idSinistre).subscribe((res: any) => {
      if(res){
        console.log('message res ::',res);
      }
    })
  }

}