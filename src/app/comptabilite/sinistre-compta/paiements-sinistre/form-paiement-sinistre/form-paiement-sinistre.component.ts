import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  listeDocumentsAjoutes: any = {};
  listeCessionnaire: Cessionnaire[];
  currentUser: any;
  dateActuelle = new Date();
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
  constructor(
    private reglementService: ReglementService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private utilities: UtilitiesService,
    private businessOptionalService: BusinessOptionalService,
    private cessionaireService: CessionnaireService,
    private sinistreService: SinistreService
  ) {
    this.currentUser = this.userService.getCurrentUserInfo();
    console.log('isPaiement :',this.isPaiement);
    
  }  

  openPanelNewPaiement(isOpen: boolean) {
    //Recuperé la div details
    let divDetails = document.getElementById("new-paiement-bilan");

    if (divDetails && isOpen) {
      divDetails.classList.add("open-details");
    } else {
      // Nous fermons notre fenetre de details
      divDetails.classList.remove("open-details");
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
      regMontant: [this.itemToUpdate?.affActivite || "", Validators.required],
      // userId: [this.currentUser.userId],
      // affId: [this.itemSinistre.affId],
      regMode: [null, Validators.required],
      resteAPayer: [this.etatComp?.sinMontant100],
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
            // this.getOldPaiement();
            this.etatComptable();
            this.openPanelNewPaiement(false);
          }
        }
      });
  } 
  
  ngOnInit(): void {
    this.createForm();
    // this.getOldPaiement();
    this.listePaiementOnsinistre();
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
  

  getReglementByCessionnaire() {
 
    let cessionnaireId:number = 0;
    if(this.getFormFiledsValue('cesId')) {
      cessionnaireId = this.getFormFiledsValue('cesId').value;
    }
   
    this.reglementService.getReglementDetailsByAffaireAndCessionnaire(cessionnaireId,this.itemSinistre.affId).subscribe((response : any) => {
      if (response) {
        this.formulaireGroup.get("regMontant").setValue(response?.resteAReverser);
      }
    });
  }
  
  getOldPaiement() {
    this.busySave = this.reglementService
      .getReglementByAffaire(
        (this.isPaiement ? "paiements" : "reversements") + "/sinistre",
        this.currentAffaire.affId
      )
      .subscribe((response: any) => {

        if (response && response['content']) {
          this.listePaiementDejaEffectue = response['content'] as Reglement[];
        }
      });
  }

  listePaiementOnsinistre(){
    this.sinistreService.listePaiementSinistre(this.itemSinistre.sinId).subscribe((res:any)=>{
      console.log('res liste paiement sinitre :',res);
      this.paiementSinistre = res.content
    })
  }

  etatComptable(){
    this.sinistreService.etatComptable(this.itemSinistre.sinId).subscribe((res:any)=>{
      console.log("res res ::", res);
      this.etatComp = res;
      this.createForm()
    })
  }
}
