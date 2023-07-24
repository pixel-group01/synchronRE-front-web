import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sinistre } from 'src/app/core/models/sinistre.model';
import { AffaireService } from 'src/app/core/service/affaire.service';
import { SinistreService } from 'src/app/core/service/sinistre.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-creation-sinistre',
  templateUrl: './creation-sinistre.component.html',
  styleUrls: ['./creation-sinistre.component.scss']
})
export class CreationSinistreComponent implements OnInit {
  [x: string]: any;
  // listeAffaires: Array<Sinistre> = [];
  listeAffaires: any =[] ;
  @Input() itemCreationSinistre :any ;
  @Input() isActiveCreationSinistre :boolean =false;
  maxDate = new Date();
  minDate = new Date();
  dataSurvenance:any; 
  dataDeclaration:any;
  affDetail:any;
  sinistre:FormGroup;
  busySave : Subscription;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() step2: EventEmitter<any> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private affaireService: AffaireService,
    private sinistreService: SinistreService
  ) { }

  ngOnInit(): void { 
    this.affaireDetail();
    this.getAffaire();
    this.maxDate.setDate(this.maxDate.getDate());
    this.sinistreForm();  
    if (this.itemCreationSinistre) {
      this.sinistre.patchValue({...this.itemCreationSinistre})
      // console.log("sinistre 111::", this.sinistre.value);
    }    
  }

  fermer(){
    this.closeModal.emit(true)
  }

  // createForm = () => {
  //   this.formulaireGroup = this.formBuilder.group({
  //     affId: [this.itemToUpdate?.affId || ""],
  //     affCode: [this.itemToUpdate?.affCode || ""],
  //     affAssure: [this.itemToUpdate?.affAssure || "", Validators.required],
  //     affActivite: [this.itemToUpdate?.affActivite || "", Validators.required],
  //     affDateEffet: [
  //       this.itemToUpdate?.affDateEffet || "",
  //       Validators.required,
  //     ],
  //     affDateEcheance: [
  //       this.itemToUpdate?.affDateEcheance || "",
  //       Validators.required,
  //     ],
  //     facNumeroPolice: [
  //       this.itemToUpdate?.facNumeroPolice || "",
  //       Validators.required,
  //     ],
  //     affCapitalInitial: [
  //       this.itemToUpdate?.affCapitalInitial || "",
  //       Validators.required,
  //     ],
  //     devCode: [
  //       this.itemToUpdate?.devCode || "",
  //       Validators.required,
  //     ],
  //     affStatutCreation: [
  //       this.itemToUpdate?.affStatutCreation || "",
  //       Validators.required,
  //     ],
  //     facSmpLci: [this.itemToUpdate?.facSmpLci || ""],
  //     facPrime: [this.itemToUpdate?.facPrime || ""],
  //     cedId: [ (this.itemToUpdate?.cedId || this.user?.cedId) || "", Validators.required],
  //     statutCode: [this.itemToUpdate?.statutCode || ""],
  //     couvertureId: [this.itemToUpdate?.couvertureId || "", Validators.required],
  //     exeCode: [this.itemToUpdate?.exeCode || "", Validators.required],
  //     restARepartir: [""],
  //     capitalDejaReparti: [
  //       this.itemToUpdate?.capitalDejaReparti || ""
  //     ],
  //   });
  // };

  sinistreForm = () =>{
    this.sinistre = this.formBuilder.group({
      sinId: [null],
      affId: [null,Validators.required],
      sinMontant100: ["",Validators.required],
      sinDateSurvenance: ["", Validators.required],
      sinMontantHonoraire: ["", Validators.required],
      sinDateDeclaration: ["",Validators.required],
      sinCommentaire: [""]
      // sinDateSur : ["",Validators.required],
      // sinDateDecl : ["" ,Validators.required]

    })
  }

  confirmSaveItem() {
    Swal.fire({
      title: this.itemCreationSinistre?.sinId? "Modification" : "Enregistrement",
      text:this.itemCreationSinistre?.sinId ? 
      "Vous êtes sur le point de modifier un sinistre. Voulez-vous poursuivre cette action ?" :
      "Vous êtes sur le point d'enregistrer un sinistre. Voulez-vous poursuivre cette action ?" ,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue l'enregistrement
        this.save(this.sinistre.value);
      }
    });
  } 

  getFormFiledsValue = (field: string) => {
    return this.sinistre.get(field);
  }

  // new FormGroup({
  //   affId : new FormControl(),
  //   sinMontant100: new FormControl(),
  //   sinDateSurvenance: new FormControl(),
  //   montantHoraire: new FormControl(),
  //   sinDateDeclaration: new FormControl(),
  //   sinCommentaire: new FormControl()
  // });

  save(data:any){
    // console.log('les données 0:',data ,this.itemCreationSinistre);
    if(this.dataDeclaration){
      data.sinDateDeclaration = this.dataDeclaration;
    }
    if (this.dataSurvenance) {
      data.sinDateSurvenance =  this.dataSurvenance;
    }
    if (this.itemCreationSinistre) {
    data.sinId = this.itemCreationSinistre.sinId;
    this.busySave = this.sinistreService.update(data).subscribe((res:any)=>{
        if(res && res.sinId){
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull(),
            "top",
            "center"
          );
          this.step2.emit(res)
        }
      })
      return 
    }
    this.busySave =  this.sinistreService.create(data).subscribe((res:any)=>{
      if(res && res.sinId){
        this.utilities.showNotification(
          "snackbar-success",
          this.utilities.getMessageOperationSuccessFull(),
          "top",
          "center"
        );
        // this.closeModal.emit(true)
        this.step2.emit(res)
      }
    })
  }

  formatDateSurvenance(evt:any){
    if(evt){
      this.dataSurvenance = moment(evt).format("DD/MM/YYYY");
    }
  }

  formatDateDeclaration(evt:any){
    if(evt){
      this.dataDeclaration = moment(evt).format("DD/MM/YYYY");
    }
  }

  affaireDetail(){
    setTimeout(() => {
    this.affDetail = {...this.listeAffaires.find((elt:any)=>  elt.affId == this.sinistre.value.affId)}
    }, 500);    
  }

  closeFormModal($event:boolean){
    this.modalRef.hide();
  }

  getAffaire() {
    this.affaireService.getAll().subscribe((res : any) => {
      if (res) {
        console.log("liste affaire :",res.content);
        this.listeAffaires = res.content || [];
        
      } 
    });
  }

}
