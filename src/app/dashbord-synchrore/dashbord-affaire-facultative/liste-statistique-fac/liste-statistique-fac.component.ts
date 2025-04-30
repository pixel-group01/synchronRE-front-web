import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/service/dashboard.service';

@Component({
  selector: 'app-liste-statistique-fac',
  templateUrl: './liste-statistique-fac.component.html',
  styleUrls: ['./liste-statistique-fac.component.scss']
})
export class ListeStatistiqueFacComponent implements OnInit {
  items: any =[];
  itemToSearch: any = {};
  currentPage: number = 0;
  itemsPerPage: number = 5;
  totalItems: number; 
  busyGet: Subscription;
  @Input() action :string;
  @Input() actionPlus :string;
  @Input() endPoint :string;
  @Input() tab :string;
  cedantes :any=[];
  cedante :any;
  debut :any;
  fin :any;
  debutCopie:any;
  finCopie:any;
  reassureurs:any=[]
  reassureur:any;
  statusEnvois:any=[{libelle :"Envoyé",value:'Envoye'},{libelle:"Non envoye", value:"Nonenvoye"}]
  statusEnvoi:any;
  statutEncaissments:any=[{libelle :"Encaissé",value:'Encaisse'},
                        {libelle:"Non encaissé", value:"Nonencaisse"},
                        {libelle:"En cours d'encaissement", value:"Encoursdencaissement"}];
  statutEncaissment:any;
  exercices :any=[];
  exercice :any;
  fileUrlDebitNote :any;
  modalRef : BsModalRef;
  dateActuelle = new Date()

  constructor(private dashboardService:DashboardService,
              public sanitizer: DomSanitizer,
              private modalService: BsModalService,) { }

  ngOnInit(): void {    
    this.exerciceDash();
    this.cedanteDash();
    this.reassureurDash();
    this.exercice="2024";
    this.getStat();
  }

  getExactlyNumberRow(page,index)
  {
      let num = index +1;
      if(page>1)
      {
          num = ((page - 1) * 10) + (index+1);
      }
      return num;
  }

   onValueDateChangeDebut($event: any) {
    console.log("event :" , $event);
    
      if ($event) {
        this.debutCopie = moment($event).format("YYYY-MM-DD");
      }else{
        this.debutCopie = '';
      }
    console.log("event debutCopie:" , this.debutCopie);

      this.getStat();
    }

    onValueDateChangeFin($event: any) {
      console.log("event  :" , $event);
      
        if ($event) {
          this.finCopie = moment($event).format("YYYY-MM-DD");
        }else{
          this.finCopie = ''
        }
      console.log("event finCopie  :" , this.finCopie);

        this.getStat();
      }

  pageChanged(event:any){    
    this.currentPage = event.page-1 ;      
    this.getStat();
  }

  clean(){    
    this.currentPage = 0
    this.getStat()
  }
  

  open(template: TemplateRef<any>) {
      let config = {
        backdrop: true,
        ignoreBackdropClick: true,
        class: "modal-width-90",
      };
      this.imprimer();
      this.modalRef = this.modalService.show(template, config);
    }

    closeFormModal(){
      this.modalRef.hide();
    }

getStat(){
  this.busyGet= this.dashboardService.getAll(this.endPoint,this.exercice, this.cedante, this.reassureur,this.statusEnvoi,
                this.statutEncaissment,this.debutCopie,this.finCopie,this.currentPage,this.itemsPerPage).subscribe((res:any)=>{
     if (res) {
       this.items = res.content;
       this.totalItems = res.totalElements;
     }
   })
 }


  changePaginationSize($event) {
    if($event) {
      this.currentPage = 0;
      this.itemsPerPage = parseInt($event);
    }    
    this.getStat();
  }

  exerciceDash(){
    this.dashboardService.exerDash().subscribe((res:any)=>{
      this.exercices = res;
    });
  }

  cedanteDash(){
    this.dashboardService.cedDash().subscribe((res:any)=>{
      this.cedantes = res.content
   });
  }
  reassureurDash(){
    this.dashboardService.reasDash().subscribe((res:any)=>{
      this.reassureurs = res.content
   });
  }

  statusEnvoiDash(){}
  statutEncaissmentDash(){}
  

  imprimer(){
    this.busyGet = this.dashboardService.getAll(this.tab,
        this.exercice, 
        this.cedante, 
        this.reassureur,
        this.statusEnvoi,
        this.statutEncaissment,this.debut,this.fin).subscribe((res:any)=>{
      this.fileUrlDebitNote = "data:application/pdf;base64,"+res?.base64UrlString;
      this.fileUrlDebitNote = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrlDebitNote);
     });
  }

  arrondir(nombre: number): number {
    return Math.round(nombre);
  }
}
