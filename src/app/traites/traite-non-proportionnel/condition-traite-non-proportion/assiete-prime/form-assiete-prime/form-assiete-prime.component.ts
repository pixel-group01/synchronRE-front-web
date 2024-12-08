import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  tranchePrime :any;
  @Input() idTraitNonProChildrenSed: number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() itemsUpdate :any;
  inputASave :any;
  constructor(
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
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
      cedId : [this.items.cedId ? this.items.cedId : null,Validators.required],

    });
   
  };

  // getListCedanteParTraite(data:any){
  //     this.busyGet = this.cedanteService.getCedanteParTranche(data).subscribe((res:any)=>{
  //       if (res) {
  //         this.items = res;
  //         this.listeCessionLegale = this.items.cessionsLegales
  //         this.formulaireGroup.patchValue({pmd : res.pmd})
  //       }
  //     })
  // }

  // calculPmd(){ 
  //   // console.log("this.formulaireGroup.value :", this.formulaireGroup.value);
  //   if (this.formulaireGroup.value.assiettePrime && this.formulaireGroup.value.tauxPrime ) {
  //       this.getListCedanteParTraite(this.formulaireGroup.value)
  //   }
  // }
 
  getCedante(itemcedId?: any,) {    
    const data: any = {
      traiteNpId: this.idTraitNonProChildrenSed
    };
    // Ajoute la clé `cedId` uniquement si `itemcedId` est défini et non vide
    if (itemcedId) {
      data.cedId = itemcedId.cedId;
    }

    this.cedanteService.getAllByTrancheCedante(data).subscribe((res: any) => {
      if (res) {
        if (!itemcedId) {
          this.cedanteListe = res.cedantes;
        }else{
          this.tranchePrime = res.tranchePrimeDtos
        }
        this.inputASave = {...res};
        console.log("inputASave 00 ::",this.inputASave);

      }
    });
  }

  capitalizeFirstLetterPreserveCase(text: string): string {
    if (!text) {
        return '';
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
}

  getCedanteParTranche(itemTranche?:any, indexTranche?:number) {    
    const data: any = {
      traiteNpId: this.idTraitNonProChildrenSed,
      cedId : this.formulaireGroup.value.cedId
    };
 
    if (itemTranche) {
      data.tranchePrimeDtos = itemTranche
    }

    this.cedanteService.getAllByTrancheCedante(data).subscribe((res: any) => {
      if (res) {
            this.inputASave = {...res};
            res.tranchePrimeDtos.map((elt:any)=>{
              if (elt.assiettePrime == this.tranchePrime[indexTranche].assietteDePrime) {
                this.tranchePrime[indexTranche].tauxPrimeTranche = elt.trancheTauxPrime
                this.tranchePrime[indexTranche].pmdTranche = elt.pmd
              }
            })
            console.log("inputASave ::",this.inputASave);

      }
    });
  }

  save(item: any) {
    const data: any = item;
    this.cedanteService.getAllByTrancheCedante(data).subscribe((res: any) => {
      if (res) {
        this.utilities.showNotification("snackbar-success",
          this.utilities.formatMsgServeur("Opération réussie."),
          "bottom",
          "center");
          // this.getCedante();
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
 
  confirmSaveItem(){
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
          this.save(this.inputASave);
        }
      });
  }

  calculAssiettePrime(index:number){
   
    const tranche = this.tranchePrime[index]; // Récupérer la tranche en fonction de l'index
    if (tranche.assietteDePrime) {
      tranche.assiettePrime = tranche.assietteDePrime
    }
    this.getCedanteParTranche([tranche], index);
}
}
