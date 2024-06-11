import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategorieService } from 'src/app/core/service/categorie.service';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-categorie',
  templateUrl: './form-categorie.component.html',
  styleUrls: ['./form-categorie.component.scss']
})
export class FormCategorieComponent implements OnInit {

  listeCategorie : any = [];
  cedantesListe : any = [];
  formulaireGroup!: FormGroup;
  @Input() idTraitNonProChildrenSed: number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() itemsUpdate :any;
  busyGet: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private cedanteService : CedanteService,
    private utilities: UtilitiesService, 
    private categorieService : CategorieService,
  ) { }
 
  ngOnInit(): void { 
    this.createForm();
    this.getCedante();
    console.log("itemsUpdate cat :", this.itemsUpdate);
    if (this.itemsUpdate) {
      this.formulaireGroup.patchValue({...this.itemsUpdate,  
        cedIds: this.itemsUpdate.cedantes.map((elt:any)=>{
        return elt.cedId
        })})
  }
  }
  
    createForm = () => {
    // console.log(" this.itemToUpdate ",this.itemToUpdate);
    this.formulaireGroup = this.formBuilder.group({
      categorieId :[null],
      categorieLibelle: ["",Validators.required],
      categorieCapacite: ["",Validators.required], 
      cedIds: [null,Validators.required],
      traiteNpId: [this.idTraitNonProChildrenSed],
    });
  };

  getCedante(){
    this.cedanteService.getAll().subscribe((res:any)=>{
      if (res) {
          this.cedantesListe = res["content"]
      }
    })
  }
 
  // getCategorie(){
  //   this.organisationService.getAll().subscribe((res:any)=>{
  //     if (res) {
  //         this.listeCategorie = res
  //     }
  //   })
  // }

  saveCategorie(item: any) {
    item.terrTaux = parseInt(item.terrTaux)
    this.busyGet = this.categorieService.create(item).subscribe((res: any) => {
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
        text: "Vous êtes sur le point d'enregistrer une catégorie. Voulez-vous poursuivre cette action ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0665aa",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
      }).then((result) => {
        if (result.value) {
          // On effectue l'enregistrement
          this.saveCategorie(item);
        }
      });
  }
}
