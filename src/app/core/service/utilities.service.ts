import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as _ from "lodash";
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  private notificationStatutForRefresh = new BehaviorSubject('');
  currentStatutToRefreshNotification = this.notificationStatutForRefresh.asObservable();

  constructor(private snackBar: MatSnackBar, public sanitizer: DomSanitizer) { }

  getMonth() {
    let listeMois = [
      { libelle: "Janvier", indice: "01" },
      { libelle: "Février", indice: "02" },
      { libelle: "Mars", indice: "03" },
      { libelle: "Avril", indice: "04" },
      { libelle: "Mai", indice: "05" },
      { libelle: "Juin", indice: "06" },
      { libelle: "Juillet", indice: "07" },
      { libelle: "Août", indice: "08" },
      { libelle: "Septembre", indice: "09" },
      { libelle: "Octobre", indice: "10" },
      { libelle: "Novembre", indice: "11" },
      { libelle: "Décembvre", indice: "12" }
    ];

    return listeMois;
  }
  refreshNotification(item ?: any) {
    this.notificationStatutForRefresh.next(item);
  }

  //Format millier
  getFormatMillierMontant(montant) {
    if (!montant || !parseFloat(montant)) return;

    console.log("le montant");
    try {
      try {
        montant = montant.replace(/ /g, '');
        montant = montant.replace(",", ".");
      } catch (error) {

      }

      var nombre = montant;
      nombre += '';
      var sep = ' ';
      var reg = /(\d+)(\d{3})/;

      while (reg.test(nombre)) {
        nombre = nombre.replace(reg, '$1' + sep + '$2');
      }
    } catch (error) {

    }

    return nombre;
  }

  showNotification(colorName, text, placementFrom, placementAlign,isForcePosition?) {
    this.snackBar.open(text, "", {
      duration: 8000,
      verticalPosition: isForcePosition ? placementFrom : 'top',
      horizontalPosition: isForcePosition ? placementAlign: 'right',
      panelClass: colorName,
    });
  }

  truncateValue(item : any,nbre)
  {
      if(!item) return;

      let regex = /(&nbsp;|<([^>]+)>)/ig;

      //RETIRER LES CARACTERES HTML
      item=item.replace(regex, "");

      if(item.length>nbre)
      {
        item = item.substring(0, nbre).trim()+""+" ...";
      }
      return item;
  }

  getMessageOperationSuccessFull() {
    return "Opération effectuée avec succès !"
  }

  getMessageFileError() {
    return "Veuillez sélectionner une extension valide SVP!"
  }
  
  formatDateInIsoData(date : string){
    if(!date) return null;

    /** Le format de la date est AAAA-MM-JJ */
    
    console.log(" date ",date);
    
    let splitDate: any = date.split("-");

    let finalDate : any;
    if(splitDate && splitDate.length > 0){
      finalDate = new Date(splitDate[0],splitDate[1]-1,splitDate[2]);
    }

    return finalDate;
  }

  formatMsgServeur(msg) {
    var messageError = msg;

    if (msg == 'Operation effectuee avec succes' || msg == 'Operation effectuee avec succes:') {
      msg = 'Opération effectuée avec succès.';
      return msg;
    }

    if (msg) {
      messageError = messageError.replace("Operation effectuee avec succes:", "Opération effectuée avec succès.");
      messageError = messageError.replace("Impossible de se connecter a la base de donnees:", "");
      messageError = messageError.replace("La base de donnees est indisponible:", "");
      messageError = messageError.replace("Permission refusee par la base de donnees:", "");
      messageError = messageError.replace("Le serveur de base de donnees a refuse la requete:", "");
      messageError = messageError.replace("Authentification echouee:", "");
      messageError = messageError.replace("Donnee existante:", "");
      messageError = messageError.replace("Liste vide : il n'y a pas de donnees respectant ce critere:", "");
      messageError = messageError.replace("il n'y a pas de donnees respectant ce critere", "");
      messageError = messageError.replace("Champ non renseigne:", "");
      messageError = messageError.replace("Utilisateur deja connecte:", "");
      messageError = messageError.replace("la requete attendue n'est pas celle fournie:", "");
      messageError = messageError.replace("Le type est incorrect:", "");
      messageError = messageError.replace("Le format de la date est incorrect:", "");
      messageError = messageError.replace("le serveur a signale un format invalide:", "");
      messageError = messageError.replace("le code de la langue n'est pas valide:", "");
      messageError = messageError.replace("La periode de date n'est pas valide", "");
      messageError = messageError.replace("une erreur est survenue lors de l'enregistrement:", "");
      messageError = messageError.replace("le name de l'entite n'est pas valide:", "");
      messageError = messageError.replace("Veuillez renseigner une seule valeur pour cette donnee:", "");
      messageError = messageError.replace("La somme des pourcentages ne doit exceder 100:", "");
      messageError = messageError.replace("Erreur de generation de fichier:", "");
      messageError = messageError.replace("login et/ou mot de passe incorrect(s):", "");
      messageError = messageError.replace("Operation interdite/refusee:", "");
      messageError = messageError.replace("Ccette donnees ne peut etre supprimee car elle est utilisee:", "");
      messageError = messageError.replace("cette donnees est trop superieure:", "");
      messageError = messageError.replace("Vous n'etes pas autoriser a effectuer cette operation.", "");
      messageError = messageError.replace("Donnee inexistante:", "");
      messageError = messageError.replace("Erreur interne:", "");
      messageError = messageError.replace("Donnee(s) non trouvee(s):", "");
      messageError = messageError.replace("Le serveur de base de donnees a refuse la requete:", "");
      messageError = messageError.replace("cette donnees ne peut etre supprimee car elle est utilisee:", "");
      messageError = messageError.replace("Vous n'etes pas autoriser a effectuer cette operation.", "");
    }

    return messageError;
  };

  getExtensionsImage() {
    return [
      { extension: 'png' },
      { extension: 'jpeg' },
      { extension: 'jpg' }
    ];
  }

  getExtensionsImageRadio() {
    return [
      { extension: 'png' },
      { extension: 'jpeg' },
      { extension: 'jpg' },
      { extension: 'jpe' }
    ];
  }

  getCodeCertificat() {
    return [
      { libelle : 'ATTESTATION DE TRAVAIL', code : 'ATT_TRAVAIL' },
      { libelle : 'png', code : 'code' },
      { libelle : 'png', code : 'code' },
      { libelle : 'png', code : 'code' },
      { libelle : 'png', code : 'code' },
      { libelle : 'png', code : 'code' },
      { libelle : 'png', code : 'code' },
      { libelle : 'png', code : 'code' },
      { libelle : 'png', code : 'code' },
    ];
  }

  getMessageEndPointNotAvailble() {
    return "Connexion momentanément interrompue, veuillez réessayer ultérieurement !";
  }

  checkEmailValidity(email : string) {
       let hasValidEmail : boolean = true;
       //Verifier si le mail saisi est correcte

      //  console.log(" email ",email);
       
       if (email) {
        let tabSplitArrobase = email.split("@");
        if (!tabSplitArrobase || tabSplitArrobase.length < 2) {
          hasValidEmail = false;
          return hasValidEmail;
        }
        else {
          //Verifier si il y a un point apres l'arobase
          let tabSplitPoint = tabSplitArrobase[1].split(".");
          if (!tabSplitPoint || tabSplitPoint.length < 2) {
            hasValidEmail = false;
            return hasValidEmail;
          }
        }
      }

      return hasValidEmail;
  }


  formatBase64UrlPdfInUrl(base64UrlString?:string) {
    const content = base64UrlString;
    // Convertir le contenu en ArrayBuffer
    const binary = atob(content);
    const len = binary.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }
    // Créer un blob avec le contenu
    const blob = new Blob([view], { type: 'pdf' });
    // Créer une URL pour le blob
    const url = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
