import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssiettePrimeService } from 'src/app/core/service/assiette-prime.service';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { TeritorrialiteService } from 'src/app/core/service/teritorrialite.service';
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
  formulaireGroup!: FormGroup;

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
      assiettePrime : ["",Validators.required],
      cedId : [null,Validators.required],
      tauxPrime: [null,Validators.required], 
      traiteNpId: [this.idTraitNonProChildrenSed],
      
      pmd : ["",Validators.required],
      tauxCesLeg: ["",Validators.required],
      paramCesLegalLibelle:[""]
    });
  };

  getListCedanteParTraite(idCedante:number){
      this.cedanteService.getCedanteParTraite(this.idTraitNonProChildrenSed, idCedante).subscribe((res:any)=>{
        console.log(res , "res de cedande par traite");
        if (res) {

          this.items = [res]
          
        }
      })
  }

  getCedante(){
    this.cedanteService.getAll().subscribe((res:any)=>{
      if (res) {
          this.cedanteListe = res['content'];
      }
    })
  }

  save(item: any) {
    this.assiettePrimeService.save(item).subscribe((res: any) => {
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
