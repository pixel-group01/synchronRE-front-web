import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { BusinessOptional } from "src/app/core/models/businessOptional";
import { Cessionnaire } from "src/app/core/models/cessionnaire";
import { Reglement } from "src/app/core/models/reglement";
import { User } from "src/app/core/models/user";
import { BusinessOptionalService } from "src/app/core/service/business-optional.service";
import { CessionnaireService } from "src/app/core/service/cessionnaire.service";
import { ReglementService } from "src/app/core/service/reglement.service";
import { UserService } from "src/app/core/service/user.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-form-paiement",
  templateUrl: "./form-paiement.component.html",
  styleUrls: ["./form-paiement.component.scss"],
})
export class FormPaiementComponent implements OnInit {
  itemInfoCompta: any = {};
  isNoteDebit :boolean = false;
  listePaiementDejaEffectue: Reglement[] = [];
  formulaireGroup!: FormGroup;
  busySave: Subscription;
  fileUrl : any;
  itemToUpdate: Reglement;
  isFondDocumentaire : boolean = false;
  @Input() currentAffaire: BusinessOptional;
  @Input() isPaiement: boolean;
  currentRowPaiement : any;
  listeDocumentsAjoutes: any = {};
  listeCessionnaire: Cessionnaire[];
  currentUser: User;
  dateActuelle = new Date();
  listeModeReglement: any = [
    {
      libelle: "Chèque",
    },
    {
      libelle: "Virement bancaire",
    },
  ];

  constructor(
    private reglementService: ReglementService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private utilities: UtilitiesService,
    private businessOptionalService: BusinessOptionalService,
    private cessionaireService: CessionnaireService,
    public sanitizer: DomSanitizer
  ) {
    this.currentUser = this.userService.getCurrentUserInfo();
  }

  openPanelNewPaiement(isOpen: boolean,isFondDoc?:boolean,currentRowPaiement?:any) {
    //Recuperé la div details
    let divDetails = document.getElementById("new-paiement-bilan");

    this.isFondDocumentaire = isFondDoc;
  
    console.log("isFondDocumentaire :" ,this.isFondDocumentaire , this.fileUrl);
    
    if(currentRowPaiement) {
      this.currentRowPaiement = {...currentRowPaiement};

      console.log(" this.currentRowPaiement ",this.currentRowPaiement);

    }

    if (divDetails && isOpen) {
      divDetails.classList.add("open-details");
    } else {
      // Nous fermons notre fenetre de details
      divDetails.classList.remove("open-details");
    }
  }



  createForm = () => {
    this.formulaireGroup = this.formBuilder.group({
      regId: [this.itemToUpdate?.regId || ""],
      cesId: ["",(!this.isPaiement) ? Validators.required : ""],
      regReference: [
        this.itemToUpdate?.regReference || "",
        Validators.required,
      ],
      regDate: [this.itemToUpdate?.affAssure || "", Validators.required],
      regMontant: [this.itemToUpdate?.affActivite || "", Validators.required],
      userId: [this.currentUser.userId],
      affId: [this.currentAffaire.affId],
      regMode: ["", Validators.required],
      resteAPayer: [this.itemInfoCompta?.resteARegler],
    });

    // if(!this.isPaiement) {
    //   // En reversement il faut griser le paiement
    //   this.formulaireGroup.get('regMontant').disable()
    // }
  };

  getEtatComptable() {
    // On verifie si il y a un business déjà crée
    if (!this.currentAffaire || !this.currentAffaire?.affId) {
      return;
    }

    this.businessOptionalService
      .getAffaireFacultativeEtatComptable(this.currentAffaire.affId)
      .subscribe((response) => {
        if (response) {
          console.log(" response Situation comptable ", response);
          this.itemInfoCompta = response;
          this.createForm();
        }
      });
  }

  getCessionnaire() {
    this.cessionaireService.getCessionnaireByAffaire(this.currentAffaire.affId).subscribe((response : any) => {
      if (response) {
        this.listeCessionnaire = response as Cessionnaire[];
      }
    });
  }

  getReglementByCessionnaire() {

    let cessionnaireId:number = 0;
    if(this.getFormFiledsValue('cesId')) {
      cessionnaireId = this.getFormFiledsValue('cesId').value;
    }

    this.reglementService.getReglementDetailsByAffaireAndCessionnaire(cessionnaireId,this.currentAffaire.affId).subscribe((response : any) => {
      if (response) {
        this.formulaireGroup.get("regMontant").setValue(response?.resteAReverser);
      }
    });
  }

  getFormFiledsValue = (field: string) => {
    return this.formulaireGroup.get(field);
  };

  confirmSaveItem() {
    Swal.fire({
      title: this.isPaiement ? "Paiement" : "Reversement",
      text: "Désirez-vous poursuivre ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue l'enregistrement
        this.saveItem(this.formulaireGroup.value);
      }
    });
  }

  saveItem(item: Reglement) {
    let itemAEnregistrer = Object.assign({}, item);
    itemAEnregistrer.regDate = moment(itemAEnregistrer.regDate).format(
      "YYYY-MM-DD"
    );
    itemAEnregistrer.regDocReqs = [];

    let listeDocumentsAEnregistrer = [];

    // Formatage du request en format data
    // let formData = new FormData();

    // formData.append("regReference",itemAEnregistrer.regReference);
    // formData.append("regDate",itemAEnregistrer.regDate);
    // formData.append("regMontant",JSON.stringify(itemAEnregistrer.regMontant));
    // formData.append("userId",JSON.stringify(itemAEnregistrer.userId) );
    // formData.append("regMode",itemAEnregistrer.regMode);
    // formData.append("regDocReqs",JSON.stringify(this.listeDocumentsAjoutes));

    // nous sommes au create
    this.busySave = this.reglementService
      .create(
        (this.isPaiement ? "paiements" : "reversements") + "/affaire",
        itemAEnregistrer
      )
      .subscribe((response: any) => {
        if (response) {
          console.log(" response", response);
          if (response?.regId) {
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );

            // On actualise la liste des paiements
            this.getOldPaiement();
            this.getEtatComptable();
            this.openPanelNewPaiement(false);
            if(!this.isPaiement){
              this.getCessionnaire();
            }

          }
        }
      });
  }

  getNoteCredit(idCessionnaire: number){
    this.isNoteDebit = true;
    if(idCessionnaire) {
      // window.open(environment.apiUrl+'reports/note-de-credit/'+this.currentAffaire.affId+'/'+idCessionnaire, '_blank');

      this.reglementService.getReportNoteCredit(this.currentAffaire.affId,idCessionnaire).subscribe(
        (response : any) => {

          let fileUrlDebitNote = "data:application/pdf;base64,"+response?.base64UrlString;

          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrlDebitNote);
          // note de debit
          this.openPanelNewPaiement(true)
        }
       )
    }
  }

  getCheque(reglementId:number) {
    this.isNoteDebit = true;
    if(reglementId) {
      // window.open(environment.apiUrl+'reports/cheque/'+reglementId, '_blank');

      this.reglementService.getReportCheque(reglementId).subscribe(
        (response : any) => {

          let fileUrlDebitNote = "data:application/pdf;base64,"+response?.base64UrlString;

          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrlDebitNote);
          this.openPanelNewPaiement(true)
        }
       )
    }
  }


  getDocumentAdd($event) {
    if ($event) {
      this.listeDocumentsAjoutes = $event;

      console.log(" this.listeDocumentsAjoutes ", this.listeDocumentsAjoutes);
    }
  }

  getOldPaiement() {
    this.busySave = this.reglementService
      .getReglementByAffaire(
        (this.isPaiement ? "paiements" : "reversements") + "/affaire",
        this.currentAffaire.affId
      )
      .subscribe((response: any) => {

        if (response && response['content']) {
          this.listePaiementDejaEffectue = response['content'] as Reglement[];
        }
      });
  }

  deleteTheLinePayment(item:any){
    this.busySave = this.reglementService.deletePayment(item.regId).subscribe((res:any)=>{
      this.getOldPaiement()
    })
  }

  ngOnInit(): void {
    this.createForm();
    this.getEtatComptable();
    this.getOldPaiement();
    if(!this.isPaiement){
      this.getCessionnaire();
    }
  }
}
