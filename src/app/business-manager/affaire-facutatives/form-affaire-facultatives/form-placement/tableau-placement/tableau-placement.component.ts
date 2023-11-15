import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { RepartitionPlacement } from 'src/app/core/models/repartitionPlacement';
import { User } from 'src/app/core/models/user';
import { BusinessOptionalRepartitionService } from 'src/app/core/service/business-optional-repartition.service';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import { environment } from 'src/environments/environment';
import Swal from "sweetalert2";

@Component({
  selector: 'app-tableau-placement',
  templateUrl: './tableau-placement.component.html',
  styleUrls: ['./tableau-placement.component.scss']
})
export class TableauPlacementComponent implements OnInit {

  @Input() listeRepartitions : any = [];
  @Input() isEnAttenteTab  : boolean = false;
  @Input() isValidationPlacement  : boolean = false;
  @Input() isValidateOnglet  : boolean = false;

  @Output() refreshData: EventEmitter<string> = new EventEmitter();
  @Output() refreshDataAffaireValide: EventEmitter<string> = new EventEmitter();

  @Input() isDetails : boolean;
  @Input() title : string = 'Liste des placements';
  @Input() canPutAction : boolean = false;
  @Output() currentPlacementSelected: EventEmitter<RepartitionPlacement> = new EventEmitter();

  itemRepartitionPlacement : any = {};
  itemRefusPlacement : any = {};
  busySave : Subscription;
  user : User;
  fileUrl : any;
  
  constructor( private utilities: UtilitiesService,
    private businessOptionalService: BusinessOptionalService, 
    private userService: UserService,
    private businessOptionalRepartition: BusinessOptionalRepartitionService,
    public sanitizer: DomSanitizer) { 
      this.user = this.userService.getCurrentUserInfo();
    } 


  getReportPlacement(idPlacement : number){
    if(idPlacement) {
      //  window.open(environment.apiUrl+'reports/display-note-de-cession-fac/'+idPlacement, '_blank');

      this.businessOptionalRepartition.reportNoteCessionPlacement(idPlacement).subscribe(
        (response : any) => {
         
          let fileUrlDebitNote = "data:application/pdf;base64,"+response?.base64UrlString;

          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrlDebitNote);
          this.openPanelNewPlacement(true)
        }
       )
       
    }
  }
  
  gotoUpdatePlacement(placement : RepartitionPlacement) {
    this.currentPlacementSelected.emit(placement);
  }


  confirmDeletePlacement(repartition) {
    Swal.fire({
      title: "Suppression placement",
      text:"Vous êtes sur le point de supprimer un placement. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue l'enregistrement

        this.deletePlacement(repartition?.repId);
      }
    });
  }

  deletePlacement(idRepartition) {
   this.busySave = this.businessOptionalRepartition.deleteRepartitionPlacement(idRepartition).subscribe(
    (response) => {
      console.log(" response ",response);
      this.utilities.showNotification(
        "snackbar-success",
        this.utilities.getMessageOperationSuccessFull(),
        "bottom",
        "center"
      );
      this.refreshData.emit(new Date().getTime().toString())
    }
   )
  }


  confirmAccepterPlacement(repartition) {
    Swal.fire({
      title: "Confirmation placement",
      text:"Vous êtes sur le point d'accepter un placement. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue l'enregistrement

        this.acceptePlacement(repartition?.repId);
      }
    });
  }

  confirmEnvoiNoteCessionnaire(repId:number) {
    Swal.fire({
      title: "Transmission de note de cession",
      text:"Vous êtes sur le point de transmettre la note de cession au cessionnaire. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue l'enregistrement
        console.log("transmettreNoteCession ");
        
        this.transmettreNoteCession(repId);
      }
    });
  }

  transmettreNoteCession(idRepartition) {

    console.log("idRepartition ",idRepartition);

    this.busySave = this.businessOptionalRepartition.transmissionNoteDeCession({},idRepartition).subscribe(
     (response) => {
      if(response) {
        this.utilities.showNotification(
          "snackbar-success",
          this.utilities.getMessageOperationSuccessFull(),
          "bottom",
          "center"
        );
        this.refreshData.emit(new Date().getTime().toString())
      }
      
     }
    )
   }

  acceptePlacement(idRepartition) {
   this.busySave = this.businessOptionalRepartition.accepterPlacement({},idRepartition).subscribe(
    (response) => {
      console.log(" response ",response);
      this.utilities.showNotification(
        "snackbar-success",
        this.utilities.getMessageOperationSuccessFull(),
        "bottom",
        "center"
      );

      this.refreshData.emit(new Date().getTime().toString())
    }
   )
  }


  confirmTransmissionPlacement(repartition) {
    Swal.fire({
      title: "Transmission de placement",
      text:"Vous êtes sur le point de transmettre un placement. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.transmettrePlacement(repartition?.repId);
      }
    });
  }

  transmettrePlacement(idRepartition) {
   this.busySave = this.businessOptionalRepartition.transmettrePlacement({},idRepartition).subscribe(
    (response) => {
      console.log(" response ",response);
      this.utilities.showNotification(
        "snackbar-success",
        this.utilities.getMessageOperationSuccessFull(),
        "bottom",
        "center"
      );

      this.refreshData.emit(new Date().getTime().toString());
      this.refreshDataAffaireValide.emit(new Date().getTime().toString());
    }
   )
  }

  confirmRefusRepartition(repartition) {
    Swal.fire({
      title: !repartition?.isRetourPlacement ? "Refus de placement" : "Retour placement",
      text: !repartition?.isRetourPlacement ? "Vous êtes sur le point de refuser un placement. Voulez-vous poursuivre cette action ?" : 
      "Vous êtes sur le point de retourner un placement. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        if(!repartition?.isRetourPlacement) {
          this.refusPlacement(repartition?.repId);
        }else{
          this.retourPlacement(repartition?.repId);
        }
      }
    });
  }

  retourPlacement(idRepartition) {
    this.busySave = this.businessOptionalRepartition.retourPlacement({},idRepartition).subscribe(
     (response) => {
       console.log(" response ",response);
       this.utilities.showNotification(
         "snackbar-success",
         this.utilities.getMessageOperationSuccessFull(),
         "bottom",
         "center"
       );
 
       this.refreshData.emit(new Date().getTime().toString());
       
     }
    )
   }

  refusPlacement(idRepartition) {
   this.busySave = this.businessOptionalRepartition.refuserPlacement({},idRepartition).subscribe(
    (response) => {
      console.log(" response ",response);
      this.utilities.showNotification(
        "snackbar-success",
        this.utilities.getMessageOperationSuccessFull(),
        "bottom",
        "center"
      );

      this.refreshData.emit(new Date().getTime().toString())
    }
   )
  }

  openPanelNewPlacement(isOpen:boolean,itemRepartition? : RepartitionPlacement,isRetourPlacement?:boolean) {

    //Recuperé la div details
    let divDetails = document.getElementById("refus-paiement");

    if(itemRepartition) {
      this.itemRepartitionPlacement =itemRepartition ? {...itemRepartition} : {};

      console.log(' this.itemRepartitionPlacement ',this.itemRepartitionPlacement);
      
      if(isRetourPlacement) {
        this.itemRepartitionPlacement.isRetourPlacement = true;
      }else{
        this.itemRepartitionPlacement.isRetourPlacement = false;
      }
    }
  
    if (divDetails && isOpen) {
      divDetails.classList.add("open-details");
    } else {
      // Nous fermons notre fenetre de details
      divDetails.classList.remove("open-details");
    }
  }


  confirmValidation(repartition) {
    Swal.fire({
      title: "Validation de placement",
      text:"Vous êtes sur le point de valider un placement. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue l'enregistrement

        this.validerPlacement(repartition?.repId);
      }
    });
  }

  validerPlacement(idRepartition) {
   this.busySave = this.businessOptionalRepartition.validerPlacement({},idRepartition).subscribe(
    (response) => {
      console.log(" response ",response);
      this.utilities.showNotification(
        "snackbar-success",
        this.utilities.getMessageOperationSuccessFull(),
        "bottom",
        "center"
      );

      this.refreshData.emit(new Date().getTime().toString());
      this.refreshDataAffaireValide.emit(new Date().getTime().toString())
    }
   )
  }


  confirmSendNoteCession(repartition) {
    Swal.fire({
      title: "Envoi de note de cession",
      text:"Vous êtes sur le point d'envoyer une note de cession. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue l'enregistrement

        this.sendNoteCession(repartition?.repId);
      }
    });
  }

  sendNoteCession(idRepartition) {
   this.busySave = this.businessOptionalRepartition.transmissionNoteDeCession({},idRepartition).subscribe(
    (response) => {
      console.log(" response ",response);
      this.utilities.showNotification(
        "snackbar-success",
        this.utilities.getMessageOperationSuccessFull(),
        "bottom",
        "center"
      );

      this.refreshData.emit(new Date().getTime().toString());
      this.refreshDataAffaireValide.emit(new Date().getTime().toString())
    }
   )
  }


  ngOnInit(): void {
  }

}
