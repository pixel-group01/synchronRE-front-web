import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationService } from 'src/app/core/service/organisation.service';
import { PaysService } from 'src/app/core/service/pays.service';
import { TeritorrialiteService } from 'src/app/core/service/teritorrialite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-teritorialite',
  templateUrl: './form-teritorialite.component.html',
  styleUrls: ['./form-teritorialite.component.scss']
})
export class FormTeritorialiteComponent implements OnInit {
  organisationListe : any = [];
  paysListe : any = [];
  formulaireGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private paysService : PaysService,
    private teritorrialiteService : TeritorrialiteService,
    private organisationService : OrganisationService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getPays();
    this.getOrganisation()
  }

    createForm = () => {
    // console.log(" this.itemToUpdate ",this.itemToUpdate);
    this.formulaireGroup = this.formBuilder.group({
      organisationLib: [null,Validators.required],
      paysLibe: [null, Validators.required],
    });
  };

  getPays(){
    this.paysService.getAll().subscribe((res:any)=>{
      if (res) {
          this.paysListe = res["content"]
      }
    })
  }

  getOrganisation(){
    this.organisationService.getAll().subscribe((res:any)=>{
      if (res) {
          this.organisationListe = res
      }
    })
  }

  saveTeritorriliate(item :any){
    this.teritorrialiteService.create(item).subscribe((res:any)=>{
      if (res) {
          console.log("ok ter 2",res);
      }else{
          console.log("ok ter 2",res);
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
