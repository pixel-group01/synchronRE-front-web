import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'angular-feather/icons';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { Cessionnaire } from 'src/app/core/models/cessionnaire';
import { Reglement } from 'src/app/core/models/reglement';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { CessionnaireService } from 'src/app/core/service/cessionnaire.service';
import { ReglementService } from 'src/app/core/service/reglement.service';
import { SinistreService } from 'src/app/core/service/sinistre.service';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-paiement-sinistre',
  templateUrl: './form-paiement-sinistre.component.html',
  styleUrls: ['./form-paiement-sinistre.component.scss']
})
export class FormPaiementSinistreComponent implements OnInit {
  itemInfoCompta: any = {};
  listePaiementDejaEffectue: Reglement[] = [];
  formulaireGroup!: FormGroup;
  busySave: Subscription; 
  itemToUpdate: Reglement;
  @Input() currentAffaire: BusinessOptional;
  @Input() isPaiement: boolean ;
  itemOfPaiement:any;
  listeDocumentsAjoutes: any = {};
  listeCessionnaire: Cessionnaire[];
  currentUser: any;
  dateActuelle = new Date();
  isFichier :boolean = false;
  isFondDocumentaire : boolean = false
  listeModeReglement: any = [
    {
      libelle: "Chèque",
    },
    {
      libelle: "Virement bancaire",
    },
  ];
  @Input() itemSinistre : any;

  etatComp :any;
  paiementSinistre: any=[];
  fileUrl : any;

  constructor(
    private reglementService: ReglementService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public sanitizer: DomSanitizer,
    private utilities: UtilitiesService,
    private businessOptionalService: BusinessOptionalService,
    private cessionaireService: CessionnaireService,
    private sinistreService: SinistreService
  ) {
    this.currentUser = this.userService.getCurrentUserInfo();
    console.log("currentUser :",this.currentUser);
    
  }  

  openPanelNewPaiement(isOpen: boolean, isFond? :boolean) {
    //Recuperé la div details
    let divDetails = document.getElementById("new-paiement-bilan");
    this.isFondDocumentaire = isFond;
    this.isFichier = isFond;
    if (divDetails && isOpen) {
      divDetails.classList.add("open-details");
    } else {
      // Nous fermons notre fenetre de details
      divDetails.classList.remove("open-details");
    }
  }

  openPanelUploadDoc(isOpen: boolean,item?:any){
    let divUploadDoc = document.getElementById("upload-popup");
    this.itemOfPaiement = item;
    if (divUploadDoc && isOpen) {
      divUploadDoc.classList.add("open-details");
    } else {
      // Nous fermons notre fenetre de details
      divUploadDoc.classList.remove("open-details");
    }
  }

  createForm = () => {
    this.formulaireGroup = this.formBuilder.group({
      // regId: [this.itemToUpdate?.regId || ""],
      sinId: [this.etatComp?.sinId],
      cesId: [null,(this.isPaiement) ? Validators.required : ""],
      regReference: [
        this.itemToUpdate?.regReference || "",
        Validators.required,
      ],
      regDate: [this.itemToUpdate?.affAssure || "", Validators.required],
      regMontant: [this.etatComp?.mtEnAttenteDeReversement || "", Validators.required],
      // userId: [this.currentUser.userId],
      // affId: [this.itemSinistre.affId],
      regMode: [null, Validators.required],
      resteAPayer: [this.etatComp?.resteARegler],
    });
  };

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
    // itemAEnregistrer.regDocReqs = [];

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
        (this.isPaiement ? "paiements" : "reversements") + "/sinistre",
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
            // On actualise la liste des paiements
            this.etatComptable();
            this.getOldPaiement();
            this.openPanelNewPaiement(false);
            this.getCessionnaire();

          }
        }
      });
  } 
  
  ngOnInit(): void {
    this.createForm();
    this.etatComptable();
    if(this.isPaiement){
      this.getCessionnaire();
    } 
  }

  getCessionnaire() { 
    this.cessionaireService.getCessionnaireByAffaire(this.itemSinistre.affId).subscribe((response : any) => {      
      if (response) {
        this.listeCessionnaire = response as Cessionnaire[];
      }
    });
  }

  getNoteCredit(idCessionnaire: number){
    if(idCessionnaire) {
      window.open(environment.apiUrl+'reports/note-de-credit/'+this.currentAffaire.affId+'/'+idCessionnaire, '_blank');
    }
  }

  getCheque(reglementId:number) {
    this.isFichier = true
    if(reglementId) {
      // window.open(environment.apiUrl+'reports/cheque/'+reglementId, '_blank');

      this.reglementService.getReportCheque(reglementId).subscribe(
        (response : any) => {          
          let fileUrlDebitNote = "data:application/pdf;base64,"+response?.base64UrlString;

          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrlDebitNote);
          this.openPanelNewPaiement(true,true)
        }
       )
    }
  }
  deleteTheLinePayment(item:any){
    this.busySave = this.reglementService.deletePayment(item.regId).subscribe((res:any)=>{
      // this.getOldPaiement()
      this.etatComptable();
      
    })
  }
  

  getReglementByCessionnaire() {
 
    let cessionnaireId:number = 0;
    if(this.getFormFiledsValue('cesId')) {
      cessionnaireId = this.getFormFiledsValue('cesId').value;
    }
   
    this.sinistreService.getReglementDetailsBySinistreAndCessionnaire(cessionnaireId,this.itemSinistre.sinId).subscribe((response : any) => {
      if (response) {
        this.formulaireGroup.get("regMontant").setValue(response?.mtResteARegler);
      }
    });
  }
  
  getOldPaiement() {    
    this.busySave = this.sinistreService.getReglementBySinitres(this.etatComp?.sinId) .subscribe((response: any) => {
        if (response) {
          this.listePaiementDejaEffectue = response.content;
        }
      });
  }

  listePaiementOnsinistre(){
    let endPoint :any= this.isPaiement? 'paiements/sinistre/list/' : 'reversements/sinistre/list/'
    this.sinistreService.listePaiemenOrReglementSinistre(endPoint+this.itemSinistre.sinId).subscribe((res:any)=>{
      console.log('res liste paiement sinitre :',res);
      this.paiementSinistre = res.content
    })
  }

  etatComptable(){
    console.log('isPaiement :',this.isPaiement);

    this.sinistreService.etatComptable(this.itemSinistre.sinId).subscribe((res:any)=>{
      console.log("res res etat comptable ::", res);
      this.etatComp = res;
      this.createForm();
      this.getOldPaiement();
      this.listePaiementOnsinistre();
    })
  }
}
