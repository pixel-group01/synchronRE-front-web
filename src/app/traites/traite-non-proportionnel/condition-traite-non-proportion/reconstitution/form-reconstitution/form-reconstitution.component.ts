import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReconstitutionService } from 'src/app/core/service/reconstitution.service';
import { TranchesService } from 'src/app/core/service/tranches.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-reconstitution',
  templateUrl: './form-reconstitution.component.html',
  styleUrls: ['./form-reconstitution.component.scss']
})
export class FormReconstitutionComponent implements OnInit {
  listeTranche : any = [];
  calaculListe : any = [{libelle:"Au proata de la garantie consommée"},{libelle:"Au prorata temporis"}];
  formulaireGroup!: FormGroup;
  @Input() idTraitNonProChildrenSed: number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
<<<<<<< HEAD
  @Input() itemsUpdate :any;  
=======
  @Input() itemsUpdate :any;
>>>>>>> ed797254eeebad513c991fec8b38d59ea207be67
  busyGet: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private reconstitutionService : ReconstitutionService,
    private tranchesService : TranchesService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getOrganisation();
    console.log('itemsUpdate :', this.itemsUpdate);
    if (this.itemsUpdate) {
      this.formulaireGroup.patchValue({...this.itemsUpdate})
    }
  }

    createForm = () => {
    // console.log(" this.itemToUpdate ",this.itemToUpdate);
    this.formulaireGroup = this.formBuilder.group({
      reconstitutionId :[null],
      nbrReconstitution: ["",Validators.required],
      modeCalculReconstitution: [null, Validators.required],
      trancheId: [null, Validators.required],
      traiteNpId: [this.idTraitNonProChildrenSed],
    });
  };

  getOrganisation(){
    this.tranchesService.getAll(this.idTraitNonProChildrenSed).subscribe((res:any)=>{
      if (res) {
          this.listeTranche = res;
      }
    })
  }

  save(item: any) {
    this.busyGet = this.reconstitutionService.save(item).subscribe((res: any) => {
      // if (res) {
        this.utilities.showNotification("snackbar-success",
          this.utilities.formatMsgServeur("Opération réussie."),
          "bottom",
          "center");
         this.closeModal.emit(true)
      // }
      // else{
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
        text:  item.reconstitutionId?  "Vous êtes sur le point de modifier une reconstitution. Voulez-vous poursuivre cette action ?" :
                "Vous êtes sur le point d'enregistrer une reconstitution. Voulez-vous poursuivre cette action ?",
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
