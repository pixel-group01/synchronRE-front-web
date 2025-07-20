import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { Subscription } from "rxjs";
import { CedanteService } from "src/app/core/service/cedante.service";
import { CompteService } from "src/app/core/service/compte.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";
import * as _ from "lodash";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/core/service/auth.service";

@Component({
  selector: "app-form-tranche",
  templateUrl: "./form-tranche.component.html",
  styleUrls: ["./form-tranche.component.scss"],
})
export class FormTrancheComponent implements OnInit {
  itemToSave: any = {};
  ListeCedantes: any = [];
  Liste: any = [];
  ListeCessionnaires: any = [];
  ListeDesignations: any = [];
  busySave: Subscription;
  currentItemCompte: any = {};
  @Input() currentTranche: any;
  user : any = {};

  constructor(
    private cedenteService: CedanteService,
    private utilities: UtilitiesService,
    private compteService: CompteService,
    private authService: AuthService
  ) {
    this.user = this.authService.currentUserValue;

    console.log(" this.user ",this.user);

  }

  // getCedante() {
  //   this.cedenteService.getAll().subscribe(
  //     (response : any) => {
  //       console.log("response ",response);
  //       if(response && response.length) {
  //         this.ListeCedantes = response;
  //       }
  //     }
  //   )
  // }

  confirmSaveItem() {
    Swal.fire({
      title: "Enregistrement",
      text: "Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        //Recuperer le traité
        let currentValueCompte = JSON.parse(
          sessionStorage.getItem("refreshValue")
        );

        let currentTrancheDto = this.currentTranche;

        console.log(" currentValueCompte ", currentValueCompte);

        if (!this.itemToSave.cedId) {
          this.utilities.showNotification(
            "snackbar-danger",
            "Veuillez sélectionner une cédante !",
            "bottom",
            "center"
          );
          return;
        }

        if (!currentValueCompte?.traiteSelected) {
          this.utilities.showNotification(
            "snackbar-danger",
            "Veuillez sélectionner un traité !",
            "bottom",
            "center"
          );
          return;
        }

        if (!currentValueCompte?.periodeSelected) {
          this.utilities.showNotification(
            "snackbar-danger",
            "Veuillez sélectionner une période !",
            "bottom",
            "center"
          );
          return;
        }

        if (!currentValueCompte?.exerciceSelected) {
          this.utilities.showNotification(
            "snackbar-danger",
            "Veuillez sélectionner un exercice !",
            "bottom",
            "center"
          );
          return;
        }

        currentTrancheDto.cedIdSelected = this.itemToSave.cedId;

        let itemAEnregistrer = {
          compteId: null,
          traiteNpId: currentValueCompte?.traiteSelected?.traiteNpId,
          exeCode: currentValueCompte.exerciceSelected,
          traiReference: currentValueCompte?.traiteSelected?.traiReference,
          traiNumero: currentValueCompte?.traiteSelected?.traiNumero,
          natCode: currentValueCompte?.traiteSelected?.natCode,
          natLibelle: currentValueCompte?.traiteSelected?.natLibelle,
          traiPeriodicite: currentValueCompte?.traiteSelected?.traiPeriodicite,
          traiEcerciceRattachement:
            currentValueCompte?.traiteSelected?.traiEcerciceRattachement,
          trancheIdSelected: this.currentTranche?.trancheId,
          periodeId: currentValueCompte?.periodeSelected?.periodeId,
          periodeName: currentValueCompte?.periodeSelected?.periodeName,
          trancheCompteDtos: [currentTrancheDto],
        };

        this.saveItem(itemAEnregistrer);
      }
    });
  }

  saveItem(item: any) {
    let itemAEnregistrer = { ...item };

    this.busySave = this.compteService
      .saveCompte(itemAEnregistrer)
      .subscribe((response: any) => {
        // if (response && response.repId) {
        if (response) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull(),
            "bottom",
            "center"
          );
        }
      });
  }

  cedanteChange(isChangeInput?:boolean) {

    if(!this.itemToSave.cedId) {
      this.ListeDesignations = [];
      this.ListeCessionnaires = [];
      return;
    }

    let currentValueCompte = JSON.parse(sessionStorage.getItem("refreshValue"));

    let currentTrancheDto = this.currentTranche;

    currentTrancheDto.cedIdSelected = this.itemToSave.cedId;

    if(isChangeInput) {
      currentTrancheDto.compteDetails = this.ListeDesignations;
    }

    let itemAEnregistrer = {
      traiteNpId: currentValueCompte?.traiteSelected?.traiteNpId,
      trancheIdSelected: this.currentTranche?.trancheId,
      periodeId: currentValueCompte?.periodeSelected?.periodeId,
      trancheCompteDtos: [currentTrancheDto],
    };

    this.busySave = this.compteService
      .getCompteTraite(itemAEnregistrer)
      .subscribe((response: any) => {
        // if (response && response.repId) {

        if (response && response?.trancheCompteDtos) {
          //On va recuperer la liste des designations
          //On va devoir recuperer la tranche concernée
          let newObjtranche = _.find(response?.trancheCompteDtos, (o) => { return o.trancheId == this.currentTranche.trancheId });

          if(newObjtranche) {
            this.ListeDesignations = newObjtranche?.compteDetails;
            this.ListeCessionnaires = newObjtranche?.compteCessionnaires;
          }
        }
      });
  }


  gotoExport() {
    let currentValueCompte = JSON.parse(sessionStorage.getItem("refreshValue"));

    console.log(" currentValueCompte ",currentValueCompte);

    let tokenObj = JSON.parse(sessionStorage.getItem("accesToken"));

    console.log(" tokenObj ",tokenObj);

    if(!tokenObj || !tokenObj.accessToken) {
      return
    }
    const TOKEN = tokenObj.accessToken ;

    fetch(environment.apiUrl+ 'reports/compte-traites/download-excel?traitenpId='+currentValueCompte?.traiteSelected?.traiteNpId
      +'&cedenteId='+this.itemToSave.cedId+'&trancheId='+this.currentTranche?.trancheId+'&periodicite='+currentValueCompte.periodiciteSelected?.name?.toUpperCase()+'&periodeId='+currentValueCompte?.periodeSelected?.periodeId+'', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+ TOKEN, // Si besoin
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'compte_traite.xlsx'; // Nom du fichier
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Erreur lors du téléchargement :', error));

  }

  gotoPrintPdf() {
    let currentValueCompte = JSON.parse(sessionStorage.getItem("refreshValue"));

    console.log(" currentValueCompte ",currentValueCompte);

    let tokenObj = JSON.parse(sessionStorage.getItem("accesToken"));

    console.log(" tokenObj ",tokenObj);

    if(!tokenObj || !tokenObj.accessToken) {
      return
    }
    const TOKEN = tokenObj.accessToken ;

    // reports/compte-traites?traitenpId=52&cedenteId=9&trancheId=252&periodicite=ANNUELLE&periodeId=1

    fetch(environment.apiUrl+ 'reports/compte-traites?traitenpId='+currentValueCompte?.traiteSelected?.traiteNpId
      +'&cedenteId='+this.itemToSave.cedId+'&trancheId='+this.currentTranche?.trancheId+'&periodicite='+currentValueCompte.periodiciteSelected?.name?.toUpperCase()+'&periodeId='+currentValueCompte?.periodeSelected?.periodeId+'', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+ TOKEN, // Si besoin
        'Accept': 'application/pdf'
      }
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'compte_traite.pdf'; // Nom du fichier
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Erreur lors du téléchargement :', error));

  }

  

  ngOnInit(): void {
    // this.getCedante();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["currentTranche"] && changes["currentTranche"].currentValue) {
      if (this.currentTranche?.compteDetails) {
        this.ListeDesignations = this.currentTranche?.compteDetails || [];
      }

      if (this.currentTranche?.compteCessionnaires) {
        this.ListeCessionnaires =
          this.currentTranche?.compteCessionnaires || [];
      }

      if (this.currentTranche?.cedantes) {
        this.ListeCedantes = this.currentTranche?.cedantes;
      }
    }
  }
}
