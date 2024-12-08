import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActiviteService } from 'src/app/core/service/activite.service';
import { CouvertureService } from 'src/app/core/service/couverture.service';
import { RisqueCouvertureService } from 'src/app/core/service/risque-couverture.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-risque-couverts',
  templateUrl: './form-risque-couverts.component.html',
  styleUrls: ['./form-risque-couverts.component.scss']
})
export class FormRisqueCouvertsComponent implements OnInit {
  couverturesListe : any = [];
  activitesListe : any = [];
  formulaireGroup!: FormGroup;
  @Input() idTraitNonProChildrenSed: number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() itemsUpdate :any;
  busyGet: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private couvertureService : CouvertureService,
    private utilities: UtilitiesService,
    private risqueCouvertureService : RisqueCouvertureService,
    private activiteService : ActiviteService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getCouvertures();
    if (this.itemsUpdate) {
      this.formulaireGroup.patchValue({...this.itemsUpdate,
        sousCouIds: this.itemsUpdate.sousCouvertures.map((elt: any) => {
          return elt.couId
        })
      })
    }
  }

    createForm = () => {
    // console.log(" this.itemToUpdate ",this.itemToUpdate);
    this.formulaireGroup = this.formBuilder.group({
      couId: [null,Validators.required],
      sousCouIds: [null,Validators.required],
      description: [""],
      traiteNpId: [this.idTraitNonProChildrenSed],
    });
  };

  clearEnfantsCouverture(){
    this.formulaireGroup.get('sousCouIds').setValue('Aucun selectionné')
  }

  getCouvertures(){
    this.couvertureService.getParentCouverture(this.idTraitNonProChildrenSed).subscribe((res:any)=>{
      if (res) {
          this.couverturesListe = res;
      }
    })
  }

  getListeActiviteCouverture(idCouv:any){
    this.couvertureService.getParentCouverture(this.idTraitNonProChildrenSed).subscribe((res:any)=>{
      if (res) {
          this.couverturesListe = res;
          this.getActivites(idCouv)
      }
    })
  }

  getActivites(idCouverture:number){
    this.clearEnfantsCouverture()
    this.couvertureService.getActivites(this.idTraitNonProChildrenSed,idCouverture).subscribe((res:any)=>{
      if (res) {
          this.activitesListe = res
      }
    })
  }

  saveRisqueCouvertureService(item: any) {
    this.busyGet = this.risqueCouvertureService.create(item).subscribe((res: any) => {
      if (res) {
        this.utilities.showNotification("snackbar-success",
          this.utilities.formatMsgServeur("Opération réussie."),
          "bottom",
          "center");
          this.getCouvertures();
          this.formulaireGroup.reset();
          this.closeModal.emit(true);
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
          this.saveRisqueCouvertureService(item);
        }
      });
  }
}
