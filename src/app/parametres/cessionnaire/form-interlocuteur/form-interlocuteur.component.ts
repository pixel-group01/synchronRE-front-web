import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cessionnaire } from 'src/app/core/models/cessionnaire';
import { Interlocuteur } from 'src/app/core/models/interlocuteur';
import { InterlocuteurService } from 'src/app/core/service/interlocuteur.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-interlocuteur',
  templateUrl: './form-interlocuteur.component.html',
  styleUrls: ['./form-interlocuteur.component.scss']
})
export class FormInterlocuteurComponent implements OnInit {

  paramForm!: FormGroup;
  @Input() itemToUpdate: Interlocuteur; // Pour signifier la mofification de l'element
  busySuscription!: Subscription;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  querySub: Subscription;
  cesId: number;
 // listeCountry : Country[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private interlocuteurService: InterlocuteurService,
    private utilities: UtilitiesService
  ) {}

  chargementOfGetInterlocuteur(){
    this.querySub = this.route.params.subscribe(
      (param:Params)=>{
        if(param.id != undefined){
          this.cesId= param.id ;
        }
      }
    );
  }

  createForm = () => {

    this.paramForm = this.formBuilder.group({
      intId: [this.itemToUpdate?.intId || ""],
      intCesId: [this.itemToUpdate?.intCesId || ""],
      intNom: [this.itemToUpdate?.intNom || "",Validators.required],
      intPrenom: [this.itemToUpdate?.intPrenom  || "", Validators.required],
      intEmail: [this.itemToUpdate?.intEmail  || "", Validators.required],
      intTel: [this.itemToUpdate?.intNom  || "",Validators.required],
    });
  };

  getFormFiledsValue = (field: string) => {
    return this.paramForm.get(field);
  };

  confirmSaveItem() {

    // Verifier si l'email est correcte
    let currentValueForm = {...this.paramForm.value};
 
    if(currentValueForm.intEmail) {
      if(!this.utilities.checkEmailValidity(currentValueForm.intEmail)){
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
      title: "Cessionnaire",
      text: (this.itemToUpdate?.intCesId && this.itemToUpdate?.intCesId > 0)
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
      itemAEnregistrer.intCesId = this.cesId

      console.log('item ::',item , itemAEnregistrer);
      
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

          this.closeModal.emit(true);
        }else{
          this.utilities.showNotification(
            "snackbar-danger",
            this.utilities.showNotification(
              "snackbar-danger",
              "Veuillez renseigner correctement les champs !",
              "bottom",
              "center"
            ),
            "bottom",
            "center"
          );
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

          this.closeModal.emit(true);
        }else{
          this.utilities.showNotification(
            "snackbar-danger",
            this.utilities.showNotification(
              "snackbar-danger",
              "Veuillez renseigner correctement les champs !",
              "bottom",
              "center"
            ),
            "bottom",
            "center"
          );
        }
       
      });
    }
  }

  ngOnInit(): void {
    // Initialisation du forms group
    this.createForm();
    this.chargementOfGetInterlocuteur()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["itemToUpdate"] && changes["itemToUpdate"].currentValue) {
      this.createForm();
    }
  }
}
