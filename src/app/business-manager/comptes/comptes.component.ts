import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { CompteService } from 'src/app/core/service/compte.service';
import { ExerciceService } from 'src/app/core/service/exercice.service';
import { TraiteNonProportionnelService } from 'src/app/core/service/traite-non-proportionnel.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.scss']
})
export class ComptesComponent implements OnInit {

  itemToSave : any = {
    traiteSelected : {}
  };
  ListeTraites : any = [];
  ListeExercice : any = [];
  ListeCedantes : any = [];
  ListeTranches : any = [];
  ListePeriode : any = [];
  ListePeriodicites : any = [];
  currentExercice : string;
  busyGet: Subscription;
  
  constructor(private compteService : CompteService,
    private exercieService: ExerciceService,private traiteNonProportionnelService : TraiteNonProportionnelService) { }


  getCurrentExercice() {
    this.exercieService.getAll().subscribe(
      (response : any) => {
        console.log("response ",response);
        if(response && response.length) {
          this.ListeExercice = response;
        }
      }
    )
  }

  changeTraite() {

    console.log(" this.itemToSave.traiteSelected ",this.itemToSave.traiteSelected);
    
    this.getTranche(this.itemToSave.traiteSelected?.traiteNpId,this.itemToSave.periodeSelected?.periodeId);
    this.refreshToSendItemsValue();
  }

  changePeriodicite(currentPeriodicite : any) {
    console.log(" currentPeriodicite ",currentPeriodicite);
    
    if(currentPeriodicite) {
      this.getPeriode(this.currentExercice,currentPeriodicite.typeId);
    }

    this.refreshToSendItemsValue();
  }

  refreshToSendItemsValue() {
    sessionStorage.setItem("refreshValue",JSON.stringify(this.itemToSave));
  }

  getTraiteNonProportionnelByExeCode(currentCodeExercice) {
    this.busyGet = this.traiteNonProportionnelService.getTraiteNonProportionnel(currentCodeExercice).subscribe(
      (response : any) => {
        console.log("response ",response);
        if(response && response.length) {
          this.ListeTraites = response;
        } 
      }
    )
  }

  getPeriodicite() {
    this.compteService.getPeriodicite().subscribe(
      (response : any) => {
        console.log("response ",response);
        if(response && response.length) {
          this.ListePeriodicites = response;
        }
      }
    )
  }


  getTranche(traiteId : number,periodeId : number) {
    this.compteService.getCompteByTraiteId(traiteId,periodeId ? periodeId : '').subscribe(
      (response : any) => {
        console.log("response ",response);
        if(response ) {
          this.ListeTranches = response?.trancheCompteDtos;

          console.log(" this.ListeTranches ",this.ListeTranches);
          
        }
      }
    )
  }



  getPeriode(exerciceCode,typeId) {
    this.compteService.getPeriode(exerciceCode,typeId).subscribe(
      (response : any) => {
        console.log("response ",response);
        if(response && response.length) {
          this.ListePeriode = response;
        }
      }
    )
  }

  selectedExercice(currentExercice) {
    if(currentExercice) {
      this.currentExercice = currentExercice;
      console.log(" currentExercice ",currentExercice);
      this.getTraiteNonProportionnelByExeCode(currentExercice);
    }

    this.refreshToSendItemsValue();
  }


  ngOnInit(): void {
    this.getCurrentExercice();
    this.getPeriodicite();
  }

}
