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
    
    // this.busySave = this.compteService
    //   .exportCompteTraite(currentValueCompte?.traiteSelected?.traiteNpId,this.itemToSave.cedId,this.currentTranche?.trancheId,currentValueCompte.periodiciteSelected?.name,currentValueCompte?.periodeSelected?.periodeId)
    //   .subscribe((response: any) => {
    //     // if (response && response.repId) {
    //   console.log(" response ",response);
      
       
    //   });

    let tokenObj = JSON.parse(sessionStorage.getItem("accesToken"));

    console.log(" tokenObj ",tokenObj);
    
    if(!tokenObj || !tokenObj.accessToken) {
      return
    }
    const TOKEN = tokenObj.accessToken ;
    //"eyJhbGciOiJIUzI1NiJ9.eyJmdW5jdGlvblN0YXJ0aW5nRGF0ZSI6MTY5MjMxNjgwMDAwMCwidHlmQ29kZSI6IlRZRl9ERVYiLCJmdW5jdGlvbk5hbWUiOiJEw6l2ZWxvcHBldXIgc3luY2hyb25lLVJlIiwidHlmSWQiOjE1MSwiZnVuY3Rpb25FbmRpbmdEYXRlIjoxNzIzOTM5MjAwMDAwLCJ1c2VySWQiOjEsIm5vbSI6IkTDqXZlbG9wcGV1ciIsImF1dGhvcml0aWVzIjpbIkNSVC1GQUMiLCJVUEQtQ09VViIsIkdFVC1SRUctVFJBSS1MU1QiLCJDUlQtREVWIiwiR0VULVBBSS1TSU4tTFNUIiwiR0VULUFGRi1QQ0wiLCJVUEQtUEFZIiwiR0VULUZBQy1DLVJFRyIsIkNSVC1FWEUiLCJHRVQtRkFDLURFVCIsIlNFTkQtTk9ULURFQi1GQUMiLCJHRVQtU0lOLUZBQy1MU1QiLCJHRVQtTE9HLUhJU1RPIiwiQ1JULUJSQU4iLCJVQkxRLVVTRVIiLCJDUlQtU1RBIiwiR0VULVNJTi1ERVQiLCJHRVQtU0lOLU1TRy1DT01QVEEiLCJTRU5ELUFDVC1NQUlMIiwiQ1JULVVTRVItRk5DIiwiR0VULVNUQS1MU1QiLCJVUEQtUk9MIiwiVVBELVJFVi1GQUMiLCJHRVQtU0lOLU1TRy1WQUwiLCJNRU5VX0FETUlOIiwiR0VULUZBQy1MU1QtQ09NUFRBIiwiR0VULUZBQy1BUkNIIiwiQ1JULVJFVi1GQUMiLCJTRU5ELU5PVC1DRVMtU0lOIiwiR0VULUJSQU4tTFNUIiwiR0VULVNUQVQtUEFSQU0iLCJUUkFOUy1TSU4iLCJHRVQtRkFDLU1PVVYiLCJVUEQtU0lOIiwiR0VULVBMQS1DLVNBSSIsIlRSQU5TLUZBQy1TT1VTIiwiR0VULVNUQVQtU0lOIiwiR0VULVNUQVQtU0lOLUZBQyIsIkNSVC1ST0wiLCJNQVJLLUZBQy1SRUEiLCJDUlQtQ0VELUxFRy1SRVAiLCJHRVQtQ09VVi1MU1QiLCJHRVQtUEFZLUxTVCIsIlJFVC1QTEEiLCJHRVQtU0lOLVRSQU5TLUxTVCIsIkNSVC1TSU4iLCJHRVQtU0lOLU1TRy1TT1VTIiwiR0VULUZBQy1MU1QiLCJNQVJLLUZBQy1OT04tUkVBIiwiRURJVC1DSFEiLCJDUlQtUExBIiwiR0VULVNJTi1MU1QiLCJVUEQtUkVWLVNJTiIsIlJFVC1TSU4iLCJHRVQtVVNFUi1ERVQiLCJHRVQtRkFDLVJFRlUtTVNHIiwiQ1JULVBBWSIsIkFOTC1QTEEiLCJNRU5VX1NJTiIsIkdFVC1TSU4tU0FJLUxTVCIsIkNSVC1QUlYiLCJDUlQtUEFJLUZBQyIsIkdFVC1QQUktRkFDLUxTVCIsIlZBTC1TSU4iLCJVUEQtVVNFUiIsIkNSVC1QTEEtRkFDIiwiVVBELVJFUCIsIkdFVC1TSU4tUkVHLUxTVCIsIkFERC1ET0MtRkFDIiwiR0VULVNJTi1UUkFJLUxTVCIsIkdFVC1UUkFJLUMtU0FJIiwiR0VULVNJTi1BVkFMLUxTVCIsIkdFVC1TVEFULUFETSIsIlVQRC1GTkMiLCJWQUwtUExBIiwiU0VORC1OT1QtQ0VTLUZBQyIsIlVQRC1QQUktU0lOIiwiUlZLLUZOQyIsIkdFVC1TVEFULVRSQUkiLCJHRVQtU0lOLUFSQ0gtTFNUIiwiR0VULUFMTC1GTkMtTFNUIiwiQ1JULUNPVVYiLCJHRVQtU0lOLUFSQ0gtTFNULUNPTVBUQSIsIlJFVC1TSU4tVkFMIiwiR0VULUJBTkstTFNUIiwiR0VULVNUQVQtRkFDIiwiRURJVC1OT1QtREVCLUZBQyIsIkdFVC1FVEEtQ09NUFQtRkFDIiwiR0VULUNFUy1MU1QiLCJUUkFOUy1TSU4tVkFMIiwiQ1JULUZOQyIsIlVQRC1DRUQiLCJSU1RSLUZOQyIsIlVQRC1CUkFOIiwiVkFMLUZBQyIsIkdFVC1DRVMtTEVHLVBBUkFNLUxTVCIsIkdFVC1GQUMtSElTVCIsIkdFVC1GQUMtUkVULU1TRyIsIlVQRC1DRVMiLCJHRVQtUkVHLVNJTi1MU1QiLCJHRVQtUkVWLVNJTi1MU1QiLCJHRVQtVVNFUi1MU1QiLCJERUwtTE9HLVNZU1QiLCJTRU5ELU5PVC1DUkVELUZBQyIsIkdFVC1QUlYtTFNUIiwiR0VULSBUUkFJLUxTVCIsIkdFVC1QTEEtUkVULU1TRyIsIlJFVC1TSU4tU09VUyIsIk1FTlVfUEFSQU0iLCJBQ1BULVBMQSIsIkNSVC1QQUktU0lOIiwiQ1JULUNFUy1MRUctUEFSQU0iLCJBUkNILUZBQyIsIkdFVC1MT0ctU1lTVCIsIkdFVC1FVEEtQ09NUFQtU0lOIiwiU0VULUZOQy1ERkxUIiwiR0VULVJFRy1GQUMtTFNUIiwiR0VULURFVi1MU1QiLCJVUEQtQ0VTLUxFRy1QQVJBTSIsIkdFVC1QTEEtQS1WQUwiLCJVUEQtUExBIiwiRExULVBMQSIsIlRSQU5TLVBMQSIsIlJFVC1GQUMtQ0VEIiwiQ1JULUNFUyIsIkJMUS1VU0VSIiwiR0VULVNJTi1TT0xELUxTVCIsIlVQRC1QQUktRkFDIiwiR0VULUZBQy1DLVNBSSIsIkdFVC1TVEFULVNJTi1UUkFJIiwiQ1JULUJBTksiLCJVUEQtQkFOSyIsIkdFVC1TSU4tSElTVE8iLCJHRVQtRkFDLUMtUExBIiwiQ1JULVJFVi1TSU4iLCJSRUZVLVBMQSIsIlNFTkQtTk9ULURFQi1TSU4iLCJVUEQtRVhFIiwiR0VULUVYRS1MU1QiLCJHRVQtQUNULUZOQy1MU1QiLCJNRU5VX0NPTVBUQSIsIkdFVC1ST0wtTFNUIiwiR0VULVBMQS1WQUwiLCJSRVQtU0lOLUNFRCIsIlVQRC1GQUMiLCJNRU5VX1NUQVQiLCJHRVQtU0lOLVNVSVYtTFNUIiwiTUVOVV9QUk9EIiwiR0VULVNJTi1TVUlWLUxTVC1DT01QVEEiLCJHRVQtQ0VTLUFGRi1MU1QiLCJVUEQtU1RBIiwiRURJVC1DSFEtUkVWLVNJTiIsIkdFVC1TSU4tTFNULUNPTVBUQSIsIlVQRC1ERVYiLCJHRVQtUkVWLUZBQy1MU1QiLCJHRVQtU0lOLVNPTEQtTFNULUNPTVBUQSIsIkRFTC1TSU4iLCJTRU5ELU5PVC1DUkVELVNJTiIsIkdFVC1DRUQtTFNUIiwiQ1JULUNFRCJdLCJjZXNJZCI6MSwiY2VzTm9tIjoiTkVMU09OLVJFIiwiY2VzU2lnbGUiOiJOUkUiLCJmdW5jdGlvbklkIjoxLCJ0eWZMaWJlbGxlIjoiRMOpdmVsb3BwZXVyIiwiaXNDb3VydGllciI6dHJ1ZSwiY29ubmVjdGlvbklkIjoiZmY0ZDExNTUtOGM2Yy00NmFjLTg1NmUtNWEyNDhmNWRmZjM0IiwidGVsIjoiMDc1ODU4NzE5MCIsIm1lbnVzIjpbIk1FTlVfU0lOIiwiTUVOVV9QQVJBTSIsIk1FTlVfQ09NUFRBIiwiTUVOVV9BRE1JTiIsIk1FTlVfU1RBVCIsIk1FTlVfUFJPRCJdLCJwcmVub20iOiJTeW5jaHJvbmUtUmUiLCJlbWFpbCI6InBpeGVsZ3JvdXAwOUBnbWFpbC5jb20iLCJzdWIiOiJwaXhlbGdyb3VwMDlAZ21haWwuY29tIiwiaWF0IjoxNzQ2NDM5MjI2LCJleHAiOjE3NDkwMzEyMjZ9.bZtF_YsG9rGuPize3uTS0F5zsWvZkBqi_1YK0iJczaU"

    fetch(environment.apiUrl+ '/reports/compte-traites/download-excel?traitenpId='+currentValueCompte?.traiteSelected?.traiteNpId
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
