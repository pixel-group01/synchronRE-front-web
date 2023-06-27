import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sinistre } from 'src/app/core/models/sinistre.model';
import { AffaireService } from 'src/app/core/service/affaire.service';
import { SinistreService } from 'src/app/core/service/sinistre.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

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
  @Input() isActiveCreationSinistre :boolean ;
  maxDate = new Date();
  minDate = new Date();
  dataSurvenance:any;
  dataDeclaration:any;
  affDetail:any;
  sinistre:FormGroup 
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private affaireService: AffaireService,
    private sinistreService: SinistreService
  ) { }

  ngOnInit(): void {
    this.getAffaire();
    this.maxDate.setDate(this.maxDate.getDate());
    this.sinistreForm()
    // console.log("sinistre :",this.sinistre.value);
    if (this.itemCreationSinistre) {
      this.sinistre.patchValue({...this.itemCreationSinistre})
    }
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
      title: "Identification",
      text:"Vous êtes sur le point d'enregistrer un sinistre. Voulez-vous poursuivre cette action ?",
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
  };
  
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
 
    if (this.itemCreationSinistre) {
    data.sinId = this.itemCreationSinistre.sinId;
      this.sinistreService.update(data).subscribe((res:any)=>{
        if(res && res.sinId){
          // console.log("creation sinistre : :",res);
          // this.closeModal.emit(true);
          // this.closeFormModal(true)
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull(),
            "top",
            "center"
          );
          // this.closeModal.emit(true);
        }
      })
      return
    }
    this.sinistreService.create(data).subscribe((res:any)=>{
      if(res && res.sinId){
        // console.log("creation sinistre : :",res);
        // this.closeModal.emit(true);
        // this.closeFormModal(true)
        this.utilities.showNotification(
          "snackbar-success",
          this.utilities.getMessageOperationSuccessFull(),
          "top",
          "center"
        );
        // this.closeModal.emit(true);
      }

    })
  }

  formatDateSurvenance(evt:any){
    // this.dataSurvenance = moment(evt).format("YYYY-MM-DD");
    // console.log("date survenance :",this.dataSurvenance);
  }

  formatDateDeclaration(evt:any){
    // this.dataDeclaration = moment(evt).format("YYYY-MM-DD");
    // console.log("date declar :",this.dataSurvenance);
  }

  affaireDetail(item :any){
    console.log("test ok :",item);
    this.affDetail = {...this.listeAffaires.find((elt:any)=>  elt.affId == item.affId)}
    console.log("test ok ok:",this.affDetail);

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
