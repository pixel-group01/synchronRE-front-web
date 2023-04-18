import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { enumTypeRupture } from 'src/app/core/enumerator/enumerator';
import { AuthService } from 'src/app/core/service/auth.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';

@Component({
  selector: 'app-search-medoc-by-unite-fonctionnelle',
  templateUrl: './search-medoc-by-unite-fonctionnelle.component.html',
  styleUrls: ['./search-medoc-by-unite-fonctionnelle.component.scss']
})
export class SearchMedocByUniteFonctionnelleComponent implements OnInit {

  
  //Declaration de la variable d'emission des valeurs
  @Output() itemMedicamentSelected = new EventEmitter<any>();
  @Input() cancelItemSelected : any;
  @Input() defaultItem : any;
  @Input() idMagasin : any;
  @Input() disabledItem : boolean = false;
  @Input() canCreateRupture : boolean = false;
  @Input() hasSearchIdMedcoc : any;

  modalRef: BsModalRef;
  isDisabled : boolean = false;
  itemToSearch: any = {};
  itemToSave: any = {};
  listItem: Array<any> = [];
  user : any = {};
  busyGet: Subscription;
  itemSelected : any = {};
  canDisplay : boolean = false;
  
  constructor(private authService: AuthService, private restClient: RestClientService,private modalService: BsModalService,private utilities: UtilitiesService) {
    this.user = this.authService.currentUserValue;
  }

  getItems() {

    this.canDisplay = true;

    let request = {
      user: this.user.id,
      data: {
        pharmacieMedicamentLibelle: this.itemToSearch.searchText ? this.itemToSearch.searchText : null,
        uniteFoncId : this.user?.uniteFoncActiveId
      },
      index: 0,
      size: 10
    }

       // this.busyGet = this.restClient.post('pharmacieStockMedicament/getByCriteria', request)
    this.busyGet = this.restClient.post('gestMatStockServiceMedicament/getByCriteria', request)
    .subscribe(
      res => {
        if (res && res['items']) {
          this.listItem = res['items'];

          this.listItem .forEach(article => {
            article.quantiteStock = article?.quantite;
            article.prixUnitaireVente = article?.prixUnitaire;
          });
        }
        else {
          this.listItem = [];
        }
      },
      err => {
      }
    );
    }
   
  


  openModal(data: any, template: TemplateRef<any>) {

    let config = {backdrop: true, ignoreBackdropClick: true};

    this.itemToSave = {};
    if (data) {
      // Lorsque nous sommes en modification
      this.itemToSave = Object.assign({}, data);
    }

    this.modalRef = this.modalService.show(template,Object.assign({},config, { class: 'modal-lg modal-width-75' }));
  }

  selectedItem(item : any){
    if(item){

      console.log(" this.itemSelected ",this.itemSelected);
      
      this.itemSelected = {...item};
      this.itemToSearch.searchText = this.itemSelected.pharmacieMedicamentLibelle;
      
      // Brodcast de la valeur
      this.itemMedicamentSelected.emit(this.itemSelected);

      // On ferme le tableau de selection des patients
      this.canDisplay = false;


      // On essai de faire l'enregistrement dans la table des ruptures 
      if(this.itemSelected && this.canCreateRupture) {
 
        console.log(" this.itemSelected?.dataMedicament?.seuilMedicament ",this.itemSelected?.dataMedicament?.seuilMedicament);
        console.log(" this.itemSelected?.quantiteStock ",this.itemSelected?.quantiteStock);
        
        if(this.itemSelected && (this.itemSelected?.dataMedicament?.seuilMedicament > this.itemSelected?.quantiteStock) ) {
         
          let objRupture = {
            medicamentId : this.itemSelected.medicamentId,
            typeRupture : enumTypeRupture.ALERTE_STOCK
          }
          this.saveItemRupture(objRupture);
        }
       
      }

    }else {
      if(!this.itemToSearch.searchText)  this.itemMedicamentSelected.emit(null);
    }
  }

  saveItemRupture(item) {
    var request = {
      user: this.user.id,
      datas: [
        item
      ]
    }

    this.restClient.post('pharmacieRuptureStock/createRupture', request)
      .subscribe(
        res => {
          if (!res['hasError']) {
          } 
        },
        err => {
        }
      );
  }

  reinitValue() {
    this.itemSelected = {};
    this.canDisplay = false;
    this.selectedItem(null);
    this.itemToSearch.searchText = '';
  }

  patientSaved($event){
    if($event){
      this.selectedItem($event);

      // Après ça on ferme le modal
      this.modalRef.hide();
    }
  }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges) {

    console.log(" changes ",changes);
    
    if(changes['cancelItemSelected'] && changes['cancelItemSelected'].currentValue)
    {
      this.itemSelected = {};
      this.itemToSearch.searchText = null;
    }

    if(changes['defaultItem'] && changes['defaultItem'].currentValue)
    {
      this.itemSelected = changes['defaultItem'].currentValue;
      this.itemToSearch.searchText = changes['defaultItem'].currentValue;
      console.log(" this.itemToSearch.searchText ",this.itemToSearch.searchText); 
    }

    if(changes['disabledItem'] && changes['disabledItem'].currentValue)
    {
      this.isDisabled = changes['disabledItem'].currentValue;
    }else {
      this.isDisabled = false;
    }
  }

}
