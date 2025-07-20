import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { from, Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/service/dashboard.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  @Input() action !:string;
  @Input() actionPlus !:string;
  @Input() endPoint !:string;
  @Input() tab !:string;
  @Input() endPointExport !:string;
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
  url :any;
  constructor(private dashboardService:DashboardService,
              public sanitizer: DomSanitizer,
              private http: HttpClient,
              private modalService: BsModalService) { 
                this.url = environment.apiUrl;
              }

  ngOnInit(): void {
    this.exerciceDash();
    this.cedanteDash();
    this.reassureurDash();
    this.exercice="2024";
    this.getStat();
  }

  getExactlyNumberRow(page,index) {
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
    // console.log("event debutCopie:" , this.debutCopie);
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
    this.fileUrlDebitNote = "";
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

  exportoExcel0() {
    this.fileUrlDebitNote = "";
    this.busyGet = this.dashboardService.getAll(
      this.endPointExport,
      this.exercice,
      this.cedante,
      this.reassureur,
      this.statusEnvoi,
      this.statutEncaissment,
      this.debut,
      this.fin
    ).subscribe({
      next: (res: ArrayBuffer) => {
        const blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        FileSaver.saveAs(blob, `Export-Dashboard-${new Date().getTime()}.xlsx`);
      },
      error: (err) => {
        console.error('Erreur lors de l\'export :', err);
      },
      complete: () => {
        console.log('Téléchargement terminé.');
      }
    });
  }


  // exportoExcel() {
  //   const currentValueCompte = JSON.parse(sessionStorage.getItem("refreshValue") || 'null');
  //   const tokenObj = JSON.parse(sessionStorage.getItem("accesToken") || 'null');
  
  //   if (!tokenObj || !tokenObj.accessToken) {
  //     console.warn("Token d'accès manquant.");
  //     return;
  //   }
  
  //   const TOKEN = tokenObj.accessToken;
  
  //   // Construction sécurisée de l'URL avec les bons paramètres
  //   const params = new URLSearchParams();
  //   if (this.exercice) params.append('exeCode', this.exercice);
  //   if (this.cedante) params.append('cedId', this.cedante);
  //   if (this.reassureur) params.append('cesId', this.reassureur);
  //   if (this.statusEnvoi) params.append('statutEnvoie', this.statusEnvoi);
  //   if (this.statutEncaissment) params.append('statutEncaissement', this.statutEncaissment);
  //   if (this.debut) params.append('debut', this.debut);
  //   if (this.fin) params.append('fin', this.fin);
  
  //   const fullUrl = `${this.url}${this.endPointExport}?${params.toString()}`;
  
  //   fetch(fullUrl, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${TOKEN}`,
  //       'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  //     }
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`Erreur HTTP ${response.status}`);
  //       }
  //       return response.blob();
  //     })
  //     .then(blob => {
  //       const downloadUrl = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = downloadUrl;
  //       a.download = `Export-Dashboard-${new Date().toISOString().slice(0, 10)}.xlsx`;
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();
  //       window.URL.revokeObjectURL(downloadUrl);
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors du téléchargement :', error);
  //     });
  // }

  exportoExcel() {
    const currentValueCompte = JSON.parse(sessionStorage.getItem("refreshValue") || 'null');
    const tokenObj = JSON.parse(sessionStorage.getItem("accesToken") || 'null');
  
    if (!tokenObj || !tokenObj.accessToken) {
      console.warn("Token d'accès manquant.");
      return;
    }
  
    const TOKEN = tokenObj.accessToken;
  
    // Construction sécurisée des paramètres
    const params = new URLSearchParams();
    if (this.exercice) params.append('exeCode', this.exercice);
    if (this.cedante) params.append('cedId', this.cedante);
    if (this.reassureur) params.append('cesId', this.reassureur);
    if (this.statusEnvoi) params.append('statutEnvoie', this.statusEnvoi);
    if (this.statutEncaissment) params.append('statutEncaissement', this.statutEncaissment);
    if (this.debut) params.append('debut', this.debut);
    if (this.fin) params.append('fin', this.fin);
  
    const fullUrl = `${this.url}${this.endPointExport}?${params.toString()}`;
  
    // Convertir le fetch en Observable pour pouvoir l'assigner à busyGet
    const fetchObservable = from(
      fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        return response.blob();
      })
    );
  
    // Subscribe et assignation à this.busyGet
    this.busyGet = fetchObservable.subscribe({
      next: (blob: Blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `Export-Dashboard-${new Date().toISOString().slice(0, 10)}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
      },
      error: (error) => {
        console.error('❌ Erreur lors du téléchargement :', error);
      },
      complete: () => {
        console.log('✅ Téléchargement terminé.');
      }
    });
  }
}


