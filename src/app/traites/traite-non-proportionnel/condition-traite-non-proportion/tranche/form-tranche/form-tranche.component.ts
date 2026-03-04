import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationService } from 'src/app/core/service/organisation.service';
import { PaysService } from 'src/app/core/service/pays.service';
import { TeritorrialiteService } from 'src/app/core/service/teritorrialite.service';
import Swal from 'sweetalert2';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import { RisqueService } from 'src/app/core/service/risque.service';
import { TranchesService } from 'src/app/core/service/tranches.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-tranche',
  templateUrl: './form-tranche.component.html',
  styleUrls: ['./form-tranche.component.scss']
})
export class FormTrancheComponent implements OnInit {

  branchesListe :any =[]
  paysListe :any =[]
  itemToSave :any;
  typeCouverture : any =[{libelle:'Par évènements'},{libelle:"Par risque et par évènements"}];
  @Input() idTraitNonProChildrenSed: number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  formulaireGroup!: FormGroup;
  @Input() itemsUpdate :any;
  busyGet: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private paysService : PaysService,
    private tranchesService : TranchesService,
    private risqueService : RisqueService
  ) { }
// a personnaliser en tranche
  ngOnInit(): void {
    this.createForm();
    this.getBranches();
    this.getPaysConcerner();
    if (this.itemsUpdate) {
      this.formulaireGroup.patchValue({...this.itemsUpdate})
  }
  }

    createForm = () => {
    // console.log(" this.itemToUpdate ",this.itemToUpdate);
    this.formulaireGroup = this.formBuilder.group({
      trancheId :[null],
      trancheLibelle: ["",Validators.required],
      trancheType: [null,Validators.required],
      tranchePriorite: [null,Validators.required],
      tranchePorte: [null,Validators.required],
      trancheTauxPrime: [null,Validators.required],
      risqueIds: [null, Validators.required],
      categorieIds : [null, Validators.required],
      traiteNpId: [this.idTraitNonProChildrenSed],
    });
  };

  getBranches(){
    this.risqueService.getAll(this.idTraitNonProChildrenSed).subscribe((res:any)=>{
      if (res) {
          this.branchesListe = res
      }
    })
  }

  getPaysConcerner(){
    this.paysService.getPaysConcerner(this.idTraitNonProChildrenSed).subscribe((res:any)=>{
      if (res) {
          this.paysListe = res
      }
    })
  }

  save(item: any) {
    this.busyGet = this.tranchesService.save(item).subscribe((res: any) => {
        this.utilities.showNotification("snackbar-success",
          this.utilities.formatMsgServeur("Opération réussie."),
          "bottom",
          "center");
           this.closeModal.emit(true)
    })
  }

  getFormFiledsValue = (field: string) => {
    return this.formulaireGroup.get(field);
  };

  confirmSaveItem(item:any){
      Swal.fire({
        title: "Enregistrement",
        text: "Vous êtes sur le point d'enregistrer une tranche. Voulez-vous poursuivre cette action ?",
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
