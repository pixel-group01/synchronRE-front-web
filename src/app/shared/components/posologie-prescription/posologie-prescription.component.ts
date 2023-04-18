import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-posologie-prescription',
  templateUrl: './posologie-prescription.component.html',
  styleUrls: ['./posologie-prescription.component.scss']
})
export class PosologiePrescriptionComponent implements OnInit {

  listeDosages : any = [];
  listePosologies : any = [];
  listeDetails : any = [];
  listeDurees : any = [];

  detaisSelected : any;
  posologieSelected : any;
  dureeSelected : any;
  dosageSelected : any;
  @Output() posologieValue = new EventEmitter<any>();
  @Output() closePopEmit = new EventEmitter<any>();

  constructor() { }

  selectedDetails(detail) {
    this.detaisSelected = detail;
    this.getValuePosologie();
    this.closePop();
  }

  selectedPosologie(posologie) {
    this.posologieSelected = posologie;
    this.getValuePosologie();
  }

  selectedDuree(duree) {
    this.dureeSelected = duree;
    this.getValuePosologie();
   
  }

  selectedDosage(dosage) {
    this.dosageSelected = dosage;
    this.getValuePosologie();
  }

  getDosages() {
    this.listeDosages = [
      '1 Comprimé',
      '2 Comprimés',
      '3 Comprimés',
      '1 Goutte',
      '2 Gouttes',
      '1 Injection',
      '1 Mésure',
      '2 Mésures', 
      '1 Application',
      '1 Géllule',
      '2 Géllules',
      '1 Sachet',
      '2 Sachets',
      '1 Lavage',
    ]
  }

  getPosologies() {
    this.listePosologies = [
      'le matin',
      'à midi',
      'l\'après midi',
      'le soir',
      'matin - midi - soir',
      'par jour',
      'au coucher',
      'au reveil',
    ]
  }

  getDetails() {
    this.listeDetails = [
      'à jeûn',
      'avant le repas',
      'pendant le repas',
      'après le repas',
      'au couché',
      'dans l\'oeil droit',
      'dans l\'oeil gauche',
      'dans les deux yeux'
    ]
  }

  getDuree() {
    this.listeDurees = [
      'en une prise',
      'pendant deux(2) jours',
      'pendant trois(3) jours',
      'pendant quatre(4) jours',
      'pendant cinq (5) jours',
      'pendant une semaine',
      'pendant deux semaines',
      'pendant trois semaines',
      'pendant un(1) mois',
      'pendant deux (2) mois',
      'pendant trois(3) mois',
    ]
  }

  closePop() {
    this.closePopEmit.emit(true)
  }

  getValuePosologie() {
    let posologie = "";

    if(this.dosageSelected) posologie = posologie +" "+ this.dosageSelected;
    if(this.posologieSelected) posologie = posologie +" "+ this.posologieSelected;
    if(this.dureeSelected) posologie = posologie +" "+ this.dureeSelected;
    if(this.detaisSelected) posologie = posologie +" "+ this.detaisSelected;
   
    this.posologieValue.emit(posologie);
  }

  setReinitValue() {
    this.dosageSelected = null;
    this.posologieSelected = null;
    this.dureeSelected = null;
    this.detaisSelected = null;
    this.getValuePosologie();
  }
  

  ngOnInit(): void {
    this.getDetails();
    this.getDosages();
    this.getDuree();
    this.getPosologies();
  }

}
