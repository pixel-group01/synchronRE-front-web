import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RisqueService } from 'src/app/core/service/risque.service';
import { SousLimiteService } from 'src/app/core/service/sous-limite.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';
import {ActiviteService} from "../../../../../core/service/activite.service";

@Component({
  selector: 'app-form-sous-limite',
  templateUrl: './form-sous-limite.component.html',
  styleUrls: ['./form-sous-limite.component.scss']
})
export class FormSousLimiteComponent implements OnInit {
  couverturesListe : any = [];
  couverturesParents : any=[]
  activiteListe : any=[]
  formulaireGroup!: FormGroup;
  @Input() idTraitNonProChildrenSed: number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() itemsUpdate :any;
  busyGet: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private risqueService : RisqueService,
    private utilities: UtilitiesService,
    private sousLimiteService : SousLimiteService,
    private activiteService : ActiviteService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getCouvertures();
    this.getCouvertureParents();
    // this.getActivites();
    if (this.itemsUpdate) {
      this.formulaireGroup.patchValue({...this.itemsUpdate,couId : this.itemsUpdate.sslimiteRisqueCouvertId})
  }
    // if (this.itemsUpdate) {
    //   this.formulaireGroup.patchValue({...this.itemsUpdate,
    //     risqueId: this.itemsUpdate.risques.map((elt: any) => {
    //       return elt.risqueId
    //     })})
    // }
}

    createForm = () => {
    // console.log(" this.itemToUpdate ",this.itemToUpdate);
    this.formulaireGroup = this.formBuilder.group({
      risqueId :[null],
      sslimiteRisqueCouvertId :[null],
      sousLimMontant: ["",Validators.required],
      couId: [null,Validators.required],
      traiteNpId: [this.idTraitNonProChildrenSed],
    });
  };

  getCouvertures(){
    this.risqueService.getAll(this.idTraitNonProChildrenSed).subscribe((res:any)=>{
      if (res) {
          this.couverturesListe = res;
      }
    })
  }

  getCouvertureParents(){
    this.risqueService.getCouvertureParents(this.idTraitNonProChildrenSed).subscribe((res:any)=>{
      if (res) {
        this.couverturesParents = res;
        // this.getActivites();
      }
    })
  }


  getActivites(risqueId:number){
    // this.clearEnfantsCouverture()
    // console.log(risqueId);
    this.activiteService.getActivitesByRisque(risqueId).subscribe((res:any)=>{
      if (res) {
        this.activiteListe = res;
      }
    })
  }


  save(item: any) {
    this.formulaireGroup.removeControl('sslimiteRisqueCouvertId');
     item = this.formulaireGroup.value;
     this.busyGet = (item.sslimiteRisqueCouvertId ? this.sousLimiteService.update : this.sousLimiteService.create)(item).subscribe((res: any) => {
      // if (res) {
        this.utilities.showNotification("snackbar-success",
          this.utilities.formatMsgServeur("Opération réussie."),
          "bottom",
          "center");
        this.closeModal.emit(true)
      // }else{
      //   this.utilities.showNotification("snackbar-danger",
      //     this.utilities.formatMsgServeur("Échec de l'opération, veuillez réessayer."),
      //     "bottom",
      //     "center");
      // }
    })
  }

  getFormFiledsValue = (field: string) => {
    return this.formulaireGroup.get(field);
  };

  confirmSaveItem(item:any){
      Swal.fire({
        title: "Enregistrement",
        text: "Vous êtes sur le point d'enregistrer une sous limite. Voulez-vous poursuivre cette action ?",
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
}
