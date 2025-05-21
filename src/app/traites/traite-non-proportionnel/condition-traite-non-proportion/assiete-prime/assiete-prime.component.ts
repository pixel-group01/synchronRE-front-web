import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Cedante } from 'src/app/core/models/cedante';
import { Exercice } from 'src/app/core/models/exercice';
import { User } from 'src/app/core/models/user';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';
import _ from 'lodash';

@Component({
  selector: 'app-assiete-prime',
  templateUrl: './assiete-prime.component.html',
  styleUrls: ['./assiete-prime.component.scss']
})
export class AssietePrimeComponent implements OnInit {
  items: any = [];
  itemToSave: any = {};
  modalRef: BsModalRef;
  listeCedente: Array<Cedante> = [];
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;
  user: User;
  listeExercices: Array<Exercice> = [];
  @Input() statutAffaire!: string;
  @Input() refreshDataTable!: string;
  @Input() noPutAction: boolean = false;
  @Input() isOngletReversement: boolean = false;
  @Input() isOngletPaiement: boolean = false;

  @Input() endPoint: string;
  @Input() idTraitNonProChildren: number;
  initialEndPoint: string;
  statutAffEnum: any;
  dataCurrent :any

  tranches :any = [];

  cedanteListe : any = [];
  listeCessionLegale :any =[];
  formulaireGroup!: FormGroup;
  tranchePrime :any;
  @Input() idTraitNonProChildrenSed: number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() itemsUpdate :any;
  inputASave :any;
  isStylePourcent :boolean = false;
  isStylefixe :boolean =false
  constructor(
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private cedanteService : CedanteService
  ) { }
  // openModal(template: TemplateRef<any>, data?: any) {
  //   let config = {
  //     backdrop: true,
  //     ignoreBackdropClick: true,
  //     class: "modal-width-58 modal-dialog-position",
  //   };
  //   // console.log('item terr ::', data);
  //   this.dataCurrent = data;
  //   this.modalRef = this.modalService.show(template, config);
  // }

  // closeFormModal($event) {
  //   this.modalRef.hide();
  //   this.businessOptionalService.setCurrentOptionalBusiness(null);
  //   this.getItems();
  // }

  // pageChanged(event: any): void {
  //   this.currentPage = event.page;
  //   this.getItems();
  // }

  // getCedente() {
  //   this.cedenteService.getAll().subscribe((response: any) => {
  //     if (response && response["content"]) {
  //       this.listeCedente = response["content"] as Cedante[];
  //     } else {
  //       this.listeCedente = [];
  //     }
  //   });
  // }

  // getExercice() {
  //   this.exercieService.getAll().subscribe((response: any) => {
  //     if (response) {
  //       this.listeExercices = response as Exercice[];
  //       this.itemToSearch.exeCode = this.listeExercices[0].exeCode;

  //       this.getItems();
  //     } else {
  //       this.listeExercices = [];
  //     }
  //   });
  // }


  // getItems() {
  //   let endPointFinal =
  //     this.endPoint + (this.idTraitNonProChildren
  //       ? "?traiNpId=" + this.idTraitNonProChildren
  //       : "") +
  //     "&page=" +
  //     (this.currentPage - 1) +
  //     "&size=" +
  //     this.itemsPerPage +
  //     "" +
  //     (this.itemToSearch.libelle ? "&key=" + this.itemToSearch.libelle : "")

  //   // if (endPointFinal && this.itemToSearch.cedenteId) {
  //   //   endPointFinal = endPointFinal + "&cedId=" + this.itemToSearch.cedenteId;
  //   // }

  //   this.busyGet = this.restClient.get(endPointFinal).subscribe(
  //     (res) => {
  //       if (res && res["content"]) {
  //         this.items = res["content"];
  //         this.totalItems = res["totalElements"];
  //       } else {
  //         this.items = [];
  //         this.totalItems = 0;
  //       }
  //     },
  //     (err) => {}
  //   );
  // }

  // closeModal($event: any) {
  //   this.modalRef.hide();

  //   // Dans le cas ou $event vaut true alors on actualise la liste
  //   if ($event) {
  //     this.getItems();
  //   }
  // }

  // getExactlyNumberRow(page, index) {
  //   let num = index + 1;
  //   if (page > 1) {
  //     num = (page - 1) * 10 + (index + 1);
  //   }
  //   return num;
  // }

  // changePaginationSize($event) {
  //   if ($event) {
  //     this.currentPage = 1;
  //     this.itemsPerPage = parseInt($event);
  //   }
  //   this.getItems();
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (
  //     changes["refreshDataTable"] &&
  //     changes["refreshDataTable"].currentValue
  //   ) {
  //     /** On reinitialise la pagination  */
  //     this.currentPage = 1;
  //     this.getItems();
  //   }
  // }

  // ngOnInit() {
  //   this.getItems();
  // }

  ngOnInit(): void {
    this.createForm();
    this.getCedante();
    if (this.itemsUpdate) {
      this.formulaireGroup.patchValue({...this.itemsUpdate})
    }
  }

  closeStyle(){
    this.isStylePourcent = true,
    this.isStylefixe =false
  }

  openStyle(){
    if (!this.formulaireGroup.value.cedId) {
      this.isStylePourcent = false,
      this.isStylefixe =true
    }else{
      this.isStylePourcent = true,
      this.isStylefixe =false
    }
  }

    createForm = () => {
    // console.log(" this.itemToUpdate ",this.itemToUpdate);
    this.formulaireGroup = this.formBuilder.group({
      cedId : [this.items.cedId ? this.items.cedId : null,Validators.required]
    });

  };

  getCedante(itemcedId?: any,) {
    const data: any = {
      traiteNpId: this.idTraitNonProChildren
    };
    // Ajoute la clé `cedId` uniquement si `itemcedId` est défini et non vide
    if (itemcedId) {
      data.cedId = itemcedId.cedId;
    }
    this.busyGet = this.cedanteService.getAllByTrancheCedante(data).subscribe((res: any) => {
      if (res) {
        if (!itemcedId) {
          this.cedanteListe = res.cedantes;
        }else{
          this.tranchePrime = res.tranchePrimeDtos;
          for (let index = 0; index < this.tranchePrime.length; index++) {
            this.tranchePrime[index].assietteDePrime = this.tranchePrime[index].assiettePrime;
            this.tranchePrime[index].tauxPrimeTranche =this.tranchePrime[index].trancheTauxPrime;
            this.tranchePrime[index].pmdTranche = this.tranchePrime[index].pmd;
          }
        }
        this.inputASave = {...res};
      }
    });
  }

  capitalizeFirstLetterPreserveCase(text: string): string {
    if (!text) {
        return '';
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  getCedanteParTranche(itemTranche?:any, indexTranche?:number) {
    const data: any = {
      traiteNpId: this.idTraitNonProChildren,
      cedId : this.formulaireGroup.value.cedId
    };

    if (itemTranche) {
      data.tranchePrimeDtos = itemTranche
    }

    this.cedanteService.getAllByTrancheCedante(data).subscribe((res: any) => {
      if (res) {
            res.tranchePrimeDtos.map((elt:any)=>{
              if (elt.assiettePrime == this.tranchePrime[indexTranche].assietteDePrime) {
                this.tranchePrime[indexTranche].tauxPrimeTranche = elt.trancheTauxPrime
                this.tranchePrime[indexTranche].pmdTranche = elt.pmd
              }
            })
            this.tranches.push(res?.tranchePrimeDtos[indexTranche])
            const uniqueData = _.uniqBy([...this.tranches].reverse(), 'trancheId');
            this.inputASave.tranchePrimeDtos = [...uniqueData];
            this.inputASave.cedId = res?.cedId;
            this.inputASave.traiteNpId = res?.traiteNpId;
            //actualisons la liste PMD par cession légale
            if (this.tranchePrime.length>0 && this.tranchePrime[indexTranche].cessionsLegales) {
                this.tranchePrime[indexTranche].cessionsLegales = res?.tranchePrimeDtos[indexTranche].cessionsLegales
            }
      }
    });
  }

  save(item: any) {
    const data: any = item;
    this.busyGet = this.cedanteService.saveTrancheCedante(data).subscribe((res: any) => {
      if (res) {
        this.utilities.showNotification("snackbar-success",
          this.utilities.formatMsgServeur("Opération réussie."),
          "bottom",
          "center");
          // this.getCedante();
        this.closeModal.emit(true);
        this.inputASave = [];
        for (let index = 0; index < this.tranchePrime.length; index++) {
          this.tranchePrime[index].assietteDePrime = "";
          this.tranchePrime[index].tauxPrimeTranche ="";
          this.tranchePrime[index].pmdTranche = "";
          this.tranchePrime[index].assiettePrimeRealisee="";
        }
        // this.tranchePrime[i].assietteDePrim
        // this.tranchePrime[i].tauxPrimeTranche
        // this.tranchePrime[i].pmdTranche
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

  confirmSaveItem(){
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
          this.save(this.inputASave);
        }
      });
  }

  calculAssiettePrime(index:number){
    const tranche = this.tranchePrime[index]; // Récupérer la tranche en fonction de l'index
    if (tranche.assietteDePrime) {
      tranche.assiettePrime = tranche.assietteDePrime
    }
    this.getCedanteParTranche([tranche], index);
}
}
