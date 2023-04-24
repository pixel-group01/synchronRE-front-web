import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { BusinessOptional } from "src/app/core/models/businessOptional";
import { RepartitionByTauxOrCapital } from "src/app/core/models/repartitionByTauxOrCapital";
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
  constructor(private businessOptionalService: BusinessOptionalService) {}

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

  ngOnInit(): void {
    if (this.businessOptionalService?.businessOptionalSubject$?.value) {
      this.currentAffaireFacultative = {
        ...this.businessOptionalService?.businessOptionalSubject$?.value,
      };
    }

    this.getDetailsBussinessOptional();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["currentRepartitionTaux"] &&
      changes["currentRepartitionTaux"].currentValue
    ) {
      this.currentRepartitionTaux =
        changes["currentRepartitionTaux"].currentValue;
    }
  }
}
