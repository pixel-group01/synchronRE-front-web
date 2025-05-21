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



   exportoExcel() {
  //   let currentValueCompte = JSON.parse(sessionStorage.getItem("refreshValue"));
  //   console.log(" currentValueCompte ",currentValueCompte);
  //   let tokenObj = JSON.parse(sessionStorage.getItem("accesToken"));
  //
  //   console.log(" tokenObj ",tokenObj);
  //
  //   if(!tokenObj || !tokenObj.accessToken) {
  //     return
  //   }
  //   const TOKEN = tokenObj.accessToken ;
  //   //"eyJhbGciOiJIUzI1NiJ9.eyJmdW5jdGlvblN0YXJ0aW5nRGF0ZSI6MTY5MjMxNjgwMDAwMCwidHlmQ29kZSI6IlRZRl9ERVYiLCJmdW5jdGlvbk5hbWUiOiJEw6l2ZWxvcHBldXIgc3luY2hyb25lLVJlIiwidHlmSWQiOjE1MSwiZnVuY3Rpb25FbmRpbmdEYXRlIjoxNzIzOTM5MjAwMDAwLCJ1c2VySWQiOjEsIm5vbSI6IkTDqXZlbG9wcGV1ciIsImF1dGhvcml0aWVzIjpbIkNSVC1GQUMiLCJVUEQtQ09VViIsIkdFVC1SRUctVFJBSS1MU1QiLCJDUlQtREVWIiwiR0VULVBBSS1TSU4tTFNUIiwiR0VULUFGRi1QQ0wiLCJVUEQtUEFZIiwiR0VULUZBQy1DLVJFRyIsIkNSVC1FWEUiLCJHRVQtRkFDLURFVCIsIlNFTkQtTk9ULURFQi1GQUMiLCJHRVQtU0lOLUZBQy1MU1QiLCJHRVQtTE9HLUhJU1RPIiwiQ1JULUJSQU4iLCJVQkxRLVVTRVIiLCJDUlQtU1RBIiwiR0VULVNJTi1ERVQiLCJHRVQtU0lOLU1TRy1DT01QVEEiLCJTRU5ELUFDVC1NQUlMIiwiQ1JULVVTRVItRk5DIiwiR0VULVNUQS1MU1QiLCJVUEQtUk9MIiwiVVBELVJFVi1GQUMiLCJHRVQtU0lOLU1TRy1WQUwiLCJNRU5VX0FETUlOIiwiR0VULUZBQy1MU1QtQ09NUFRBIiwiR0VULUZBQy1BUkNIIiwiQ1JULVJFVi1GQUMiLCJTRU5ELU5PVC1DRVMtU0lOIiwiR0VULUJSQU4tTFNUIiwiR0VULVNUQVQtUEFSQU0iLCJUUkFOUy1TSU4iLCJHRVQtRkFDLU1PVVYiLCJVUEQtU0lOIiwiR0VULVBMQS1DLVNBSSIsIlRSQU5TLUZBQy1TT1VTIiwiR0VULVNUQVQtU0lOIiwiR0VULVNUQVQtU0lOLUZBQyIsIkNSVC1ST0wiLCJNQVJLLUZBQy1SRUEiLCJDUlQtQ0VELUxFRy1SRVAiLCJHRVQtQ09VVi1MU1QiLCJHRVQtUEFZLUxTVCIsIlJFVC1QTEEiLCJHRVQtU0lOLVRSQU5TLUxTVCIsIkNSVC1TSU4iLCJHRVQtU0lOLU1TRy1TT1VTIiwiR0VULUZBQy1MU1QiLCJNQVJLLUZBQy1OT04tUkVBIiwiRURJVC1DSFEiLCJDUlQtUExBIiwiR0VULVNJTi1MU1QiLCJVUEQtUkVWLVNJTiIsIlJFVC1TSU4iLCJHRVQtVVNFUi1ERVQiLCJHRVQtRkFDLVJFRlUtTVNHIiwiQ1JULVBBWSIsIkFOTC1QTEEiLCJNRU5VX1NJTiIsIkdFVC1TSU4tU0FJLUxTVCIsIkNSVC1QUlYiLCJDUlQtUEFJLUZBQyIsIkdFVC1QQUktRkFDLUxTVCIsIlZBTC1TSU4iLCJVUEQtVVNFUiIsIkNSVC1QTEEtRkFDIiwiVVBELVJFUCIsIkdFVC1TSU4tUkVHLUxTVCIsIkFERC1ET0MtRkFDIiwiR0VULVNJTi1UUkFJLUxTVCIsIkdFVC1UUkFJLUMtU0FJIiwiR0VULVNJTi1BVkFMLUxTVCIsIkdFVC1TVEFULUFETSIsIlVQRC1GTkMiLCJWQUwtUExBIiwiU0VORC1OT1QtQ0VTLUZBQyIsIlVQRC1QQUktU0lOIiwiUlZLLUZOQyIsIkdFVC1TVEFULVRSQUkiLCJHRVQtU0lOLUFSQ0gtTFNUIiwiR0VULUFMTC1GTkMtTFNUIiwiQ1JULUNPVVYiLCJHRVQtU0lOLUFSQ0gtTFNULUNPTVBUQSIsIlJFVC1TSU4tVkFMIiwiR0VULUJBTkstTFNUIiwiR0VULVNUQVQtRkFDIiwiRURJVC1OT1QtREVCLUZBQyIsIkdFVC1FVEEtQ09NUFQtRkFDIiwiR0VULUNFUy1MU1QiLCJUUkFOUy1TSU4tVkFMIiwiQ1JULUZOQyIsIlVQRC1DRUQiLCJSU1RSLUZOQyIsIlVQRC1CUkFOIiwiVkFMLUZBQyIsIkdFVC1DRVMtTEVHLVBBUkFNLUxTVCIsIkdFVC1GQUMtSElTVCIsIkdFVC1GQUMtUkVULU1TRyIsIlVQRC1DRVMiLCJHRVQtUkVHLVNJTi1MU1QiLCJHRVQtUkVWLVNJTi1MU1QiLCJHRVQtVVNFUi1MU1QiLCJERUwtTE9HLVNZU1QiLCJTRU5ELU5PVC1DUkVELUZBQyIsIkdFVC1QUlYtTFNUIiwiR0VULSBUUkFJLUxTVCIsIkdFVC1QTEEtUkVULU1TRyIsIlJFVC1TSU4tU09VUyIsIk1FTlVfUEFSQU0iLCJBQ1BULVBMQSIsIkNSVC1QQUktU0lOIiwiQ1JULUNFUy1MRUctUEFSQU0iLCJBUkNILUZBQyIsIkdFVC1MT0ctU1lTVCIsIkdFVC1FVEEtQ09NUFQtU0lOIiwiU0VULUZOQy1ERkxUIiwiR0VULVJFRy1GQUMtTFNUIiwiR0VULURFVi1MU1QiLCJVUEQtQ0VTLUxFRy1QQVJBTSIsIkdFVC1QTEEtQS1WQUwiLCJVUEQtUExBIiwiRExULVBMQSIsIlRSQU5TLVBMQSIsIlJFVC1GQUMtQ0VEIiwiQ1JULUNFUyIsIkJMUS1VU0VSIiwiR0VULVNJTi1TT0xELUxTVCIsIlVQRC1QQUktRkFDIiwiR0VULUZBQy1DLVNBSSIsIkdFVC1TVEFULVNJTi1UUkFJIiwiQ1JULUJBTksiLCJVUEQtQkFOSyIsIkdFVC1TSU4tSElTVE8iLCJHRVQtRkFDLUMtUExBIiwiQ1JULVJFVi1TSU4iLCJSRUZVLVBMQSIsIlNFTkQtTk9ULURFQi1TSU4iLCJVUEQtRVhFIiwiR0VULUVYRS1MU1QiLCJHRVQtQUNULUZOQy1MU1QiLCJNRU5VX0NPTVBUQSIsIkdFVC1ST0wtTFNUIiwiR0VULVBMQS1WQUwiLCJSRVQtU0lOLUNFRCIsIlVQRC1GQUMiLCJNRU5VX1NUQVQiLCJHRVQtU0lOLVNVSVYtTFNUIiwiTUVOVV9QUk9EIiwiR0VULVNJTi1TVUlWLUxTVC1DT01QVEEiLCJHRVQtQ0VTLUFGRi1MU1QiLCJVUEQtU1RBIiwiRURJVC1DSFEtUkVWLVNJTiIsIkdFVC1TSU4tTFNULUNPTVBUQSIsIlVQRC1ERVYiLCJHRVQtUkVWLUZBQy1MU1QiLCJHRVQtU0lOLVNPTEQtTFNULUNPTVBUQSIsIkRFTC1TSU4iLCJTRU5ELU5PVC1DUkVELVNJTiIsIkdFVC1DRUQtTFNUIiwiQ1JULUNFRCJdLCJjZXNJZCI6MSwiY2VzTm9tIjoiTkVMU09OLVJFIiwiY2VzU2lnbGUiOiJOUkUiLCJmdW5jdGlvbklkIjoxLCJ0eWZMaWJlbGxlIjoiRMOpdmVsb3BwZXVyIiwiaXNDb3VydGllciI6dHJ1ZSwiY29ubmVjdGlvbklkIjoiZmY0ZDExNTUtOGM2Yy00NmFjLTg1NmUtNWEyNDhmNWRmZjM0IiwidGVsIjoiMDc1ODU4NzE5MCIsIm1lbnVzIjpbIk1FTlVfU0lOIiwiTUVOVV9QQVJBTSIsIk1FTlVfQ09NUFRBIiwiTUVOVV9BRE1JTiIsIk1FTlVfU1RBVCIsIk1FTlVfUFJPRCJdLCJwcmVub20iOiJTeW5jaHJvbmUtUmUiLCJlbWFpbCI6InBpeGVsZ3JvdXAwOUBnbWFpbC5jb20iLCJzdWIiOiJwaXhlbGdyb3VwMDlAZ21haWwuY29tIiwiaWF0IjoxNzQ2NDM5MjI2LCJleHAiOjE3NDkwMzEyMjZ9.bZtF_YsG9rGuPize3uTS0F5zsWvZkBqi_1YK0iJczaU"
  //
  //   fetch(environment.apiUrl+ 'reports/compte-traites/download-excel?traitenpId='+currentValueCompte?.traiteSelected?.traiteNpId
  //     +'&cedenteId='+this.itemToSave.cedId+'&trancheId='+this.currentTranche?.trancheId+'&periodicite='+currentValueCompte.periodiciteSelected?.name?.toUpperCase()+'&periodeId='+currentValueCompte?.periodeSelected?.periodeId+'', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Bearer '+ TOKEN, // Si besoin
  //       'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  //     }
  //   })
  //     .then(response => response.blob())
  //     .then(blob => {
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = 'compte_traite.xlsx'; // Nom du fichier
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();
  //       URL.revokeObjectURL(url);
  //     })
  //     .catch(error => console.error('Erreur lors du téléchargement :', error));
  //
  //
   }

}

