import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Sinistre } from 'src/app/core/models/sinistre.model';
import { AffaireService } from 'src/app/core/service/affaire.service';
import { SinistreService } from 'src/app/core/service/sinistre.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import * as moment from 'moment';

@Component({
  selector: 'app-creation-sinistre',
  templateUrl: './creation-sinistre.component.html',
  styleUrls: ['./creation-sinistre.component.scss']
})
export class CreationSinistreComponent implements OnInit {
  [x: string]: any;
  // listeAffaires: Array<Sinistre> = [];
  listeAffaires: any =[] ;
  maxDate = new Date();
  minDate = new Date();
  dataSurvenance:any;
  dataDeclaration:any;
  affDetail:any;
  sinistre:FormGroup = new FormGroup({
    affId : new FormControl(),
    sinMontant100: new FormControl(),
    sinDateSurvenance: new FormControl(),
    montantHoraire: new FormControl(),
    sinDateDeclaration: new FormControl(),
    sinCommentaire: new FormControl()
  });
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private utilities: UtilitiesService,
    private affaireService: AffaireService,
    private sinistreService: SinistreService
  ) { }

  ngOnInit(): void {
    this.getAffaire();
    this.maxDate.setDate(this.maxDate.getDate());
    console.log("sinistre :",this.sinistre.value);

  }

  save(data:any){
    console.log(data, 'les données :');
    this.sinistreService.create(data).subscribe((res:any)=>{
      if(res){
        console.log("creation sinistre : :",res);
        // this.closeModal.emit(true);
        // this.closeFormModal(true)
        // this.utilities.showNotification(
        //   "snackbar-success",
        //   this.utilities.getMessageOperationSuccessFull(),
        //   "top",
        //   "center"
        // );
        // this.closeModal.emit(true);
      }

    })
  }

  formatDateSurvenance(evt:any){
    this.dataSurvenance = moment(evt).format("YYYY-MM-DD");
    console.log("date survenance :",this.dataSurvenance);
  }

  formatDateDeclaration(evt:any){
    this.dataDeclaration = moment(evt).format("YYYY-MM-DD");
    console.log("date declar :",this.dataSurvenance);
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
