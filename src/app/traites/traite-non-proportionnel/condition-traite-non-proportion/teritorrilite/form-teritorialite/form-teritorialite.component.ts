import { Component, OnInit,Input, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationService } from 'src/app/core/service/organisation.service';
import { PaysService } from 'src/app/core/service/pays.service';
import { TeritorrialiteService } from 'src/app/core/service/teritorrialite.service';
import Swal from 'sweetalert2';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-teritorialite',
  templateUrl: './form-teritorialite.component.html',
  styleUrls: ['./form-teritorialite.component.scss']
})
export class FormTeritorialiteComponent implements OnInit {
  organisationListe : any = [];
  paysListe : any = [];
  formulaireGroup!: FormGroup;
  @Input() idTraitNonProChildrenSed: number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() itemsUpdate :any;
  busyGet: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private paysService : PaysService,
    private utilities: UtilitiesService,
    private teritorrialiteService : TeritorrialiteService,
    private organisationService : OrganisationService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getPays();
    this.getOrganisation();
    // console.log('itemsUpdate :', this.itemsUpdate);
    if (this.itemsUpdate) {
      this.formulaireGroup.patchValue({...this.itemsUpdate,
        paysCodes: this.itemsUpdate.paysList.map((elt:any)=>{
        return elt.paysCode
        })
      ,orgCodes : this.itemsUpdate.organisationList,
       traiteNpId : this.idTraitNonProChildrenSed})
    }
 
  }

    createForm = () => {
    // console.log(" this.itemToUpdate ",this.itemToUpdate);
    this.formulaireGroup = this.formBuilder.group({
      terrId: [""],
      terrLibelle: ["",Validators.required],
      terrTaux: [null],
      orgCodes: [[]],
      paysCodes: [null, Validators.required],
      terrDescription: [""],
      traiteNpId: [this.idTraitNonProChildrenSed],
    });
  };

  getPays(data?:any){
    let endPointFinal = data?.length >0 ? `pays/organisations?orgCodes=${data}` : "pays/organisations";
    this.paysService.getAllFiltre(endPointFinal).subscribe((res:any)=>{
      if (res) {
          this.paysListe = res;
          if(data && data.length>0){
            this.formulaireGroup.patchValue({
              paysCodes:  this.paysListe.map((elt:any)=>{
                return elt.paysCode
              })
            });
          }else{
            // if (!this.itemsUpdate) {
              // this.formulaireGroup.get('paysCodes').setValue(['Aucun selectionné'])
            // }
            this.paysListe = res
          }
      }
    })
  }

  getOrganisation(){
    this.organisationService.getAll().subscribe((res:any)=>{
      if (res) {
          this.organisationListe = res;
      }
    })
  }

  saveTeritorriliate(item: any) {
    // item.terrId
    if (item.terrTaux) {
      item.terrTaux = parseInt(item.terrTaux);
    }
    this.busyGet = (item.terrId ? this.teritorrialiteService.update(item) : this.teritorrialiteService.create(item)).subscribe((res: any) => {
      if (res) {
        this.utilities.showNotification("snackbar-success",
          this.utilities.formatMsgServeur("Opération réussie."),
          "bottom",
          "center");
        this.closeModal.emit(true)
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
          this.saveTeritorriliate(item);
        }
      });
  }

}
