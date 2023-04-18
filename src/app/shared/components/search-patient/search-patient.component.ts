import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.scss']
})
export class SearchPatientComponent implements OnInit {

  //Declaration de la variable d'emission des valeurs
  @Output() itemPatientSelected = new EventEmitter<any>();
  @Input() cancelItemSelected : any;
  @Input() defaultItem : any;
  @Input() beneficiaireId : any;

  modalRef: BsModalRef;
  itemToSearch: any = {};
  itemToSave: any = {};
  listPatients: Array<any> = [];
  user : any = {};
  busyGet: Subscription;
  itemSelected : any = {};
  canDisplay : boolean = false;
  
  constructor(private authService: AuthService, private restClient: RestClientService,private modalService: BsModalService,private utilities: UtilitiesService) {
    this.user = this.authService.currentUserValue;
  }

  getItems() {

    this.selectedPatient({});
    // On affiche le tableau des patients
    this.canDisplay = true;

    let request = {
      user: this.user.id,
      data: {
        searchString: this.beneficiaireId ? null : (this.itemToSearch.searchText ? this.itemToSearch.searchText : null),
        id : this.beneficiaireId || null
      },
      index: 0,
      size: 15
    }

    this.busyGet = this.restClient.post('beneficiaire/getByCriteria', request)
      .subscribe(
        res => {
          if (res && res['items']) {
            this.listPatients = res['items'];

            console.log(' this.listPatients ',this.listPatients);
            
            if(this.beneficiaireId) {
              this.selectedPatient(this.listPatients[0]); 
              this.canDisplay = false;
            }
          }
          else {
            this.listPatients = [];
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

  selectedPatient(patient : any){
    if(patient && patient?.id){
      this.itemSelected = {...patient};

      this.itemSelected.identite = this.itemSelected?.nom +' '+ this.itemSelected.prenom;
      this.itemToSearch.searchText = this.itemSelected.identite; 
      
      // Brodcast de la valeur
      this.itemPatientSelected.emit(this.itemSelected);
      // On ferme le tableau de selection des patients
      this.canDisplay = false;
      this.beneficiaireId = null;
    }else {
      this.itemPatientSelected.emit({});
    }
  }

  patientSaved($event){
    if($event){
      this.selectedPatient($event);

      // Après ça on ferme le modal
      this.modalRef.hide();
    }
  }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges) {

    if(changes['cancelItemSelected'] && changes['cancelItemSelected'].currentValue)
    {
      this.itemSelected = {};
      this.itemToSearch.searchText = null;
    }

    if(changes['defaultItem'] && changes['defaultItem'].currentValue)
    {
      this.itemSelected = changes['defaultItem'].currentValue;
      this.itemToSearch.searchText = this.itemSelected?.nom +' '+this.itemSelected.prenom;
      this.itemSelected.identite = this.itemToSearch.searchText;
    }

    if(changes['beneficiaireId'] && changes['beneficiaireId'].currentValue)
    {
      console.log(" changes['beneficiaireId'] ",changes['beneficiaireId']);

      this.beneficiaireId = parseInt(changes['beneficiaireId'].currentValue);

      this.getItems();
    }

  }

}
