import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Bank } from 'src/app/core/models/bank';
import { AuthService } from 'src/app/core/service/auth.service';
import { BankService } from 'src/app/core/service/bank.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-bank',
  templateUrl: './form-bank.component.html',
  styleUrls: ['./form-bank.component.scss']
})
export class FormBankComponent implements OnInit {

  paramBankForm!: FormGroup;
  loading : boolean=false;
  @Input() bankToUpdate : Bank;
  busySuscription! : Subscription;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,private bankService:BankService, private restClient:RestClientService,private authService:AuthService) { }

  createForm = () => {
    this.paramBankForm = this.formBuilder.group({
      banCode: ['', Validators.required],
      banLibelle: ['', Validators.required],
      // discoveryChannel: ['', Validators.required],
      banLibelleAbrege: ['', Validators.required],
    });
  };

  getFormFiledsValue = (field: string) => {
    return this.paramBankForm.get(field);
  };


  confirmSaveItem(){
  
    Swal.fire({
      title: "Banque",
      text: this.bankToUpdate?.banId ? "Vous êtes sur le point de modifier une banque. Voulez-vous poursuivre cette action ?" : "Vous êtes sur le point d'enregistrer une banque. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {
        console.log( this.paramBankForm.value);
        this.saveItem(this.paramBankForm.value);
      }
    });
    
  }

  saveItem(item:Bank) {

    let itemAEnregistrer = Object.assign({}, item);
    this.loading = true;

    // Mock appel user
   
    this.restClient.post('banques/create',itemAEnregistrer).subscribe(
      (response)=> {
        console.log(" response ",response);
        
      }
    )
  }

  ngOnInit(): void {

    // Initialisation du forms group
    this.createForm();
  }

}
