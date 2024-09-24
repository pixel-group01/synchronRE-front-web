import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategorieService } from 'src/app/core/service/categorie.service';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { LimiteSouscriptionService } from 'src/app/core/service/limite-souscription.service';
import { RisqueService } from 'src/app/core/service/risque.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-limite-souscription',
  templateUrl: './form-limite-souscription.component.html',
  styleUrls: ['./form-limite-souscription.component.scss']
})
export class FormLimiteSouscriptionComponent implements OnInit {
  listeCouvertures : any = []; 
  listeCategorie : any = [];
  formulaireGroup!: FormGroup;
  busyGet: Subscription;

  @Input() idTraitNonProChildrenSed: number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() itemsUpdate :any;
  
  constructor(
    private formBuilder: FormBuilder,
    private limiteSouscriptionService : LimiteSouscriptionService,
    private utilities: UtilitiesService,
    private risqueService : RisqueService,
    private categorieService : CategorieService
  ) { }
 
  ngOnInit(): void { 
    this.createForm();
    this.getRisque();
    this.getCategorie();
    // console.log('itemsUpdate :', this.itemsUpdate);
    if (this.itemsUpdate) {
      this.formulaireGroup.patchValue({...this.itemsUpdate})
    }
  }
 
    createForm = () => {
    // console.log(" this.itemToUpdate ",this.itemToUpdate);
    this.formulaireGroup = this.formBuilder.group({
    limiteSouscriptionId:[null],
    risqueId : [null,Validators.required],
    categorieId: [null,Validators.required], 
    limSousMontant: ["",Validators.required], 
    traiteNpId: [this.idTraitNonProChildrenSed],
    });
  }; 

  getRisque(){
    this.risqueService.getAll(this.idTraitNonProChildrenSed).subscribe((res:any)=>{
      if (res) {
          this.listeCouvertures = res;
      }
    })
  }
 
  getCategorie(){
    this.categorieService.getCategorieList(this.idTraitNonProChildrenSed).subscribe((res:any)=>{
      if (res) {
          this.listeCategorie = res;
      }
    })
  }

  save(item: any) {
    this.busyGet = this.limiteSouscriptionService.save(item).subscribe((res: any) => {
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
          this.save(item);
        }
      });
  }
}