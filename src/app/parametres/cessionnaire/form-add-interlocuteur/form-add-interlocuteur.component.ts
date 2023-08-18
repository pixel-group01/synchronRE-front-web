import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Interlocuteur } from 'src/app/core/models/interlocuteur';
import { InterlocuteurService } from 'src/app/core/service/interlocuteur.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-add-interlocuteur',
  templateUrl: './form-add-interlocuteur.component.html',
  styleUrls: ['./form-add-interlocuteur.component.scss']
})
export class FormAddInterlocuteurComponent implements OnInit {

  itemToUpdate : Interlocuteur;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  items : Interlocuteur[];
  itemToSearch : any = {};

  @Input() idCessionnaire:number;

  busySuscription : Subscription;
  paramForm!: FormGroup;

  constructor(  private formBuilder: FormBuilder, private utilities: UtilitiesService,private interlocuteurService: InterlocuteurService) { }

  createForm = () => {

    this.paramForm = this.formBuilder.group({
      intId: [this.itemToUpdate?.intId || ""],
      intCesId: [this.idCessionnaire || ""],
      intEmail: [this.itemToUpdate?.intEmail || ""],
      intTel: [this.itemToUpdate?.intTel || "",
      Validators.required],
      intNom: [this.itemToUpdate?.intNom || "",Validators.required],
      intPrenom: [this.itemToUpdate?.intPrenom || "", Validators.required,
  ]
    });
  };

  getFormFiledsValue = (field: string) => {
    return this.paramForm.get(field);
  };

  confirmDeleteInterlocuteur(interlocuteur : Interlocuteur) {
    Swal.fire({
      title: "Suppression",
      text:"Vous êtes sur le point de supprimer un interlocuteur ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.deleteItem(interlocuteur?.intCesId);
      }
    });
  }

  deleteItem(intCesId:number) {
   this.busySuscription = this.interlocuteurService.deleteItem(intCesId).subscribe(
    (response) => {
      console.log(" response ",response);
      this.utilities.showNotification(
        "snackbar-success",
        this.utilities.getMessageOperationSuccessFull(),
        "bottom",
        "center"
      );
      this.getItems();
    }
   )
  }

  pageChanged(event: any): void {
    this.currentPage = event.page ;
    this.getItems();
  }


  confirmSaveItem() {

    // Verifier si l'email est correcte
    let currentValueForm = {...this.paramForm.value};
 
    if(currentValueForm.cesEmail) {
      if(!this.utilities.checkEmailValidity(currentValueForm.cesEmail)){
        this.utilities.showNotification(
          "snackbar-danger",
          "Veuillez renseigner un mail valide !",
          "bottom",
          "center"
        );
        return
      }
    }

    Swal.fire({
      title: "Interlocuteur",
      text: (this.itemToUpdate?.intId && this.itemToUpdate?.intId > 0)
        ? "Vous êtes sur le point de modifier un interlocuteur. Voulez-vous poursuivre cette action ?"
        : "Vous êtes sur le point d'enregistrer un interlocuteur. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.saveItem(this.paramForm.value);
      }
    });
  }

  saveItem(item: Interlocuteur) {
    let itemAEnregistrer = Object.assign({}, item);

    if (!itemAEnregistrer.intId) {
      // nous sommes au create
      this.busySuscription = this.interlocuteurService.create(itemAEnregistrer).subscribe((response : any) => {
        console.log(" response ", response);
        if (response) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull(),
            "bottom",
            "center"
          );
          this.getItems();
          this.cancelSave();
        }
      });
    } else {
      // Nous sommes en modification
      this.busySuscription = this.interlocuteurService.update(itemAEnregistrer).subscribe((response: any) => {
        console.log(" response ", response);
        if (response) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull(),
            "bottom",
            "center"
          );
          this.getItems();
          this.cancelSave();
        }
       
      });
    }
  }

  cancelSave() {
    this.itemToUpdate = {};
    this.createForm();
  }

  getItems() {
    this.busySuscription = this.interlocuteurService.getByCriteria((this.currentPage - 1),this.itemsPerPage,(this.itemToSearch.libelle ? this.itemToSearch.libelle : null),this.idCessionnaire)
      .subscribe(
        res => {
          if (res && res['content']) {
            this.items = res['content'] as Interlocuteur[];
            this.totalItems = res['totalElements'];
          }
          else {
            this.items = [];
            this.totalItems = 0;
          }
        },
        err => {
        }
      );
  }

  ngOnInit(): void {
    this.createForm();
    this.getItems();
  }

}
