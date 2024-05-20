import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationService } from 'src/app/core/service/organisation.service';
import { PaysService } from 'src/app/core/service/pays.service';
import { TeritorrialiteService } from 'src/app/core/service/teritorrialite.service';
import Swal from 'sweetalert2';
import { UtilitiesService } from 'src/app/core/service/utilities.service';

@Component({
  selector: 'app-form-tranche',
  templateUrl: './form-tranche.component.html',
  styleUrls: ['./form-tranche.component.scss']
})
export class FormTrancheComponent implements OnInit {

  organisationListe :any =[]
  itemToSave :any;


  @Input() idTraitNonProChildrenSed: number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  formulaireGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private teritorrialiteService : TeritorrialiteService,
    private organisationService : OrganisationService
  ) { }
// a personnaliser en tranche
  ngOnInit(): void { 
    this.createForm();
    this.getOrganisation()
  }

    createForm = () => {
    // console.log(" this.itemToUpdate ",this.itemToUpdate);
    this.formulaireGroup = this.formBuilder.group({
      trancheLibelle: ["",Validators.required],
      tranchePriorite: [null,Validators.required], 
      tranchePorte: [null,Validators.required],
      risqueId: [null, Validators.required],
      traiteNpId: [this.idTraitNonProChildrenSed, Validators.required],
    });
  };
  
  getOrganisation(){
    this.organisationService.getAll().subscribe((res:any)=>{
      if (res) {
          this.organisationListe = res
      }
    })
  }

  saveTeritorriliate(item: any) {
    item.terrTaux = parseInt(item.terrTaux)
    this.teritorrialiteService.create(item).subscribe((res: any) => {
      if (res) {
        this.utilities.showNotification("snackbar-success",
          this.utilities.formatMsgServeur("Opération réussie."),
          "bottom",
          "center");
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
        text: "Vous êtes sur le point d'enregistrer une Teritottialité. Voulez-vous poursuivre cette action ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0665aa",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
      }).then((result) => {
        if (result.value) {
          // On effectue l'enregistrement
          this.saveTeritorriliate(item);
        }
      });
  }
}