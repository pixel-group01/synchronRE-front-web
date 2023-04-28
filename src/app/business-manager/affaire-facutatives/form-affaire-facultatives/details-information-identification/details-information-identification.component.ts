import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { BusinessOptional } from "src/app/core/models/businessOptional";
import { RepartitionByTauxOrCapital } from "src/app/core/models/repartitionByTauxOrCapital";
import { BusinessOptionalRepartitionService } from "src/app/core/service/business-optional-repartition.service";
import { BusinessOptionalService } from "src/app/core/service/business-optional.service";

@Component({
  selector: "app-details-information-identification",
  templateUrl: "./details-information-identification.component.html",
  styleUrls: ["./details-information-identification.component.scss"],
})
export class DetailsInformationIdentificationComponent implements OnInit {
  currentAffaireFacultative: BusinessOptional;
  itemDetailsAffaire: any;
  @Input() currentRepartitionTaux!: RepartitionByTauxOrCapital;
  @Input() isPlacement:boolean = false;
  detailsPlacement : any;

  constructor(private businessOptionalService: BusinessOptionalService,private businessOptionalRepartitionService: BusinessOptionalRepartitionService,) {}

  getDetailsBussinessOptional() {
    // On verifie si il y a un business déjà crée
    if (
      !this.currentAffaireFacultative ||
      !this.currentAffaireFacultative?.affId
    ) {
      return;
    }

    this.businessOptionalService
      .getDetailsAffaireFacultative(this.currentAffaireFacultative.affId)
      .subscribe((response) => {
        if (response) {
          this.itemDetailsAffaire = response;

          console.log(" this.itemDetailsAffaire ", this.itemDetailsAffaire);
        }
      });
  }

  getEtatComptable() {
    // On verifie si il y a un business déjà crée
    if (
      !this.currentAffaireFacultative ||
      !this.currentAffaireFacultative?.affId
    ) {
      return;
    }

    console.log(" this.currentAffaireFacultative ",this.currentAffaireFacultative);
    

     this.businessOptionalService
      .getAffaireFacultativeEtatComptable(this.currentAffaireFacultative.affId)
      .subscribe((response) => {
        if (response) {
          console.log(" response etat comptable ", response);
          this.detailsPlacement = response;

          console.log(" this.detailsPlacement  ",this.detailsPlacement );
          
        }
      });
  }

  ngOnInit(): void {
    if (this.businessOptionalService?.businessOptionalSubject$?.value) {
      this.currentAffaireFacultative = {
        ...this.businessOptionalService?.businessOptionalSubject$?.value,
      };

      this.getDetailsBussinessOptional();
     
    }


    if(!this.currentRepartitionTaux || !this.currentRepartitionTaux.taux) {
      this.currentRepartitionTaux = JSON.parse(sessionStorage.getItem("itemRepartitionTaux")) as RepartitionByTauxOrCapital;
    }
  }

  getRepartionByCapital() {
  
    this.businessOptionalRepartitionService
      .getRepartitionCalculatByCapital(
        this.currentAffaireFacultative.affId,
        0
      )
      .subscribe((response) => {
        if (response) {

          console.log(" response capital ",response);
          
          this.currentRepartitionTaux = response as RepartitionByTauxOrCapital;
        }
      });
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log(" changes ",changes);
    
    if (
      changes["currentRepartitionTaux"] &&
      changes["currentRepartitionTaux"].currentValue
    ) {
      this.currentRepartitionTaux =
        changes["currentRepartitionTaux"].currentValue;
    }
 
    if (
      changes["isPlacement"] &&
      changes["isPlacement"].currentValue
    ) {
      setTimeout(() => {
        this.getEtatComptable();
      }, 1300);
    }
    
    // else{
    //   setTimeout(() => {
    //       this.getRepartionByCapital();
    //   }, 1000);
    // }

   
  }
}
