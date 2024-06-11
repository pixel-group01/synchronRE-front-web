import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { enumStatutAffaire } from 'src/app/core/enumerator/enumerator';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { Exercice } from 'src/app/core/models/exercice';
import { User } from 'src/app/core/models/user';
import { PlacementTriterNonProService } from 'src/app/core/service/placement-triter-non-pro.service';
import { ReassureurService } from 'src/app/core/service/reassureur.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-traite-non-proportion-step3',
  templateUrl: './form-traite-non-proportion-step3.component.html',
  styleUrls: ['./form-traite-non-proportion-step3.component.scss']
})
export class FormTraiteNonProportionStep3Component implements OnInit {
  items: Array<BusinessOptional> = [];
  itemToSave: any = {};
  modalRef: BsModalRef;
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;
  user: User;
  listeExercices: Array<Exercice> = [];
  @Input() statutAffaire!: string;
  @Input() refreshDataTable!: string;
  @Input() noPutAction: boolean = false;
  @Input() isOngletReversement: boolean = false;
  @Input() isOngletPaiement: boolean = false;
  @Input() endPoint: string;
  @Input() currentTraiterNonPropoChildSde: any;

  initialEndPoint: string;
  statutAffEnum: any;

  repTauxCourtierPlaceur : any;
  repTauxCourtier :any;
  formulaireGroup!: FormGroup;
  listeReassureurs: any =[];
  @Input() idTraitNonProChildren: number;
  repartition :any ={}
  constructor(
    private userService: UserService,
    private utilities : UtilitiesService,
    private reassureurService : ReassureurService ,

    private placementTriterNonProService : PlacementTriterNonProService,
    private restClient:RestClientService,
    private formBuilder: FormBuilder,
  ) {
    this.user = this.userService.getCurrentUserInfo();
    this.statutAffEnum = enumStatutAffaire;

    if (this.user.cedId) {
      this.itemToSearch.cedenteId = this.user.cedId;
    }
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getItems();
  }

  getRepartie(){
    this.placementTriterNonProService.getRpartepartie(this.idTraitNonProChildren).subscribe((res:any)=>{
      if (res) {
          // console.log('res repartie :', res);
        //  this.repTauxCourtierPlaceur = res.traiTauxCourtierPlaceur;
         this.repTauxCourtier  =res.traiTauxDejaPlace;
        //  this.formulaireGroup.get('repTauxCourtierPlaceur')?.setValue(res.traiTauxCourtierPlaceur);
         this.formulaireGroup.get('repTauxCourtier')?.setValue(res.traiTauxDejaPlace);
      }
    })
  }

  getReassurreur() {
    this.reassureurService.getAll(this.idTraitNonProChildren).subscribe((response: any) => {
      if (response) {
        this.listeReassureurs = response;
      }
    });
  }  

  createForm = () => {
  // console.log(" this.itemToUpdate ",this.itemToUpdate);
  this.formulaireGroup = this.formBuilder.group({
    // repPrime :[""],
    repTaux: ["",Validators.required],
    // repTauxCourtierPlaceur: [""], 
    repTauxCourtier: [""],
    cesId: [null,Validators.required],
    aperiteur: [false,Validators.required],
    traiteNpId: [this.idTraitNonProChildren ? this.idTraitNonProChildren : ""],
  });
  };

  getFormFiledsValue = (field: string) => {
    return this.formulaireGroup.get(field);
  };

  getItems() {
    this.endPoint = "repartitions/traite-non-proportionnel/search";
    let endPointFinal =
      this.endPoint +
      "?page=" +
      (this.currentPage - 1) +
      "&size=" +
      this.itemsPerPage +
      "" +
      (this.itemToSearch.libelle ? "&key=" + this.itemToSearch.libelle : "") +
      "" +
      (this.idTraitNonProChildren
        ? "&traiteNpId=" + this.idTraitNonProChildren
        : "");

    this.busyGet = this.restClient.get(endPointFinal).subscribe(
        (res:any)=>{
        if (res && res["content"]) {
          this.items = res["content"];
          this.totalItems = res["totalElements"];
        } else {
          this.items = [];
          this.totalItems = 0;
        }
   }
    );
  }

  save(item:any){
    // Remove the controls
    // this.formulaireGroup.removeControl('repTauxCourtierPlaceur');
    this.formulaireGroup.removeControl('repTauxCourtier');
    // Now you can pass the form value to the save method
   item = this.formulaireGroup.value;
    this.placementTriterNonProService.create(item).subscribe((res: any) => {
      if (res) {
        this.utilities.showNotification("snackbar-success",
          this.utilities.formatMsgServeur("Opération réussie."),
          "bottom",
          "center");
          this.getItems();
          this.getRepartie();
          this.formulaireGroup.get('repTaux')?.reset();
          this.formulaireGroup.get('aperiteur')?.reset();
          this.formulaireGroup.get('cesId')?.reset();
      }else{
        this.utilities.showNotification("snackbar-danger",
          this.utilities.formatMsgServeur("Échec de l'opération, veuillez réessayer."),
          "bottom",
          "center");
      }
    })
  }

  confirmSaveItem(item:any){
    Swal.fire({
      title: "Enregistrement",
      text: "Vous êtes sur le point d'enregistrer un placement. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue l'enregistrement
        this.save(item);
      }
    });
  }

  // closeModal($event: any) {
  //   this.modalRef.hide();

  //   // Dans le cas ou $event vaut true alors on actualise la liste
  //   if ($event) {
  //     this.getItems();
  //   }
  // }

  getExactlyNumberRow(page, index) {
    let num = index + 1;
    if (page > 1) {
      num = (page - 1) * 10 + (index + 1);
    }
    return num;
  }

  changePaginationSize($event) {
    if ($event) {
      this.currentPage = 1;
      this.itemsPerPage = parseInt($event);
    }
    this.getItems();
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (
  //     changes["refreshDataTable"] &&
  //     changes["refreshDataTable"].currentValue
  //   ) {
  //     /** On reinitialise la pagination  */
  //     this.currentPage = 1;
  //     this.getItems();
  //   }
  // }

  ngOnInit() {  
    this.createForm();
    this.getRepartie();
    this.getReassurreur();
    this.getItems();
    if (this.currentTraiterNonPropoChildSde && this.currentTraiterNonPropoChildSde.traiteNpId) {
        this.formulaireGroup.patchValue({...this.currentTraiterNonPropoChildSde});
    console.log("currentTraiterNonPropoChildSde ::", this.currentTraiterNonPropoChildSde);

    }
  }
}
