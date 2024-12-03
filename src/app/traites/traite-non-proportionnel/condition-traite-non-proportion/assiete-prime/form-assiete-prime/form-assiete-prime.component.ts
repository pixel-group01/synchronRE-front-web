import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AssiettePrimeService } from 'src/app/core/service/assiette-prime.service';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-assiete-prime',
  templateUrl: './form-assiete-prime.component.html',
  styleUrls: ['./form-assiete-prime.component.scss']
})
export class FormAssietePrimeComponent implements OnInit {
  items :any =[];
  cedanteListe : any = [];
  listeCessionLegale :any =[];
  formulaireGroup!: FormGroup;
  busyGet: Subscription;
  
  @Input() idTraitNonProChildrenSed: number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() itemsUpdate :any;

  constructor(
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private assiettePrimeService : AssiettePrimeService,
    private cedanteService : CedanteService
  ) { }
 
  ngOnInit(): void { 
    this.createForm();
    this.getCedante();
    if (this.itemsUpdate) {
      this.formulaireGroup.patchValue({...this.itemsUpdate})
    }
  }
 
    createForm = () => {
    // console.log(" this.itemToUpdate ",this.itemToUpdate);
    this.formulaireGroup = this.formBuilder.group({
      assiettePrime : [this.items.assiettePrime ? this.items.assiettePrime : null,Validators.required],
      cedId : [this.items.cedId ? this.items.cedId : null,Validators.required],
      tauxPrime: [this.items.tauxPrime ? this.items.tauxPrime : null,Validators.required], 
      traiteNpId: [this.idTraitNonProChildrenSed],
      cessionsLegales : [null],
      pmd : [this.items.pmd ? this.items.pmd : "",Validators.required], 
      tauxCesLeg: [""],
      paramCesLegalLibelle:[""],
      tauxCourtier: [null],
      tauxCourtierPlaceur : [null]
    });
  };

  getListCedanteParTraite(data:any){
      this.busyGet = this.cedanteService.getCedanteParTranche(data).subscribe((res:any)=>{
        console.log(res , "res de cedande par traite");
        if (res) {
          this.items = res;
          this.listeCessionLegale = this.items.cessionsLegales
          this.formulaireGroup.patchValue({pmd : res.pmd})
        }
      })
  }

  calculPmd(){ 
    // console.log("this.formulaireGroup.value :", this.formulaireGroup.value);
    if (this.formulaireGroup.value.assiettePrime && this.formulaireGroup.value.tauxPrime ) {
        this.getListCedanteParTraite(this.formulaireGroup.value)
    }
  }

  getCedante(){
    const data = {
      "cedId": 8,
      "traiteNpId": this.idTraitNonProChildrenSed
    }
    this.cedanteService.getAllByTrancheCedante(data).subscribe((res:any)=>{
      if (res) {
        console.log(res , "res de cedante par tranche");
          this.cedanteListe = res;
      }
    })
  }
 
  save(item: any) {
    item.cessionsLegales = this.listeCessionLegale ;
    this.busyGet = this.assiettePrimeService.save(item).subscribe((res: any) => {
      if (res) {
        this.utilities.showNotification("snackbar-success",
          this.utilities.formatMsgServeur("Opération réussie."),
          "bottom",
          "center");
          this.getCedante();
        this.closeModal.emit(true)
      }else{
        this.utilities.showNotification("snackbar-danger",
          this.utilities.formatMsgServeur("Échec de l'opération, veuillez réessayer."),
          "bottom",
          "center");
      }
    })
  }

  getFormFiledsValue = (field: string) => {
    return this.formulaireGroup.get(field);
  };
 
  confirmSaveItem(item:any){
      Swal.fire({
        title: "Enregistrement",
        text: "Vous êtes sur le point d'enregistrer une assiette de prime. Voulez-vous poursuivre cette action ?",
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
