import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as _ from "lodash";
import { ReglementDocument } from 'src/app/core/models/reglementDocument';
import { typeDocument } from 'src/app/core/models/typeDocument';
import { TypeDocumentService } from 'src/app/core/service/type-document.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';

@Component({
  selector: 'app-add-file-in-form',
  templateUrl: './add-file-in-form.component.html',
  styleUrls: ['./add-file-in-form.component.scss']
})
export class AddFileInFormComponent implements OnInit {

  @Output() emitDocuments: EventEmitter<any> = new EventEmitter();

  listeDocumentsAjoutes : ReglementDocument[] = [];
  currentDocument : ReglementDocument;
  itemDocumentAjoute : any = {};
  listeTypesDocuments : typeDocument[] = [];

  constructor(private utilities: UtilitiesService,private typeDocumentService : TypeDocumentService) { }

  uploadFile(event: any) {

    let item = {
      fileName: null,
      fileBase64: null
    };

    let reader = new FileReader();

    let file = event.target.files[0];

    if (file.size > (1000000*5)) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez vérifier la taille du fichier (max:5Mo).",
        "bottom",
        "center"
      );
      event.target.value = null;
      return;
    }

    item.fileName = file.name;
    let Tabextension = file.name.split('.');
    let extension = Tabextension[Tabextension.length - 1];

    //verifier si l'extension est accepter
    const listeExtensionImagesValide = this.utilities.getExtensionsImage();

    if (!_.find(listeExtensionImagesValide, { 'extension': extension.toLowerCase() })) {
        this.utilities.showNotification(
          "snackbar-danger",
          "Veuillez vérifier l'extension du fichier.",
          "bottom",
          "center"
        );
        event.target.value = null;
        return;
    }

   

    reader.onload = (readerEvent) => {

      let data = (readerEvent.target as any).result;
    
      let currentItemImage : ReglementDocument = {
        docTypeId: this.itemDocumentAjoute.typeDocSelected?.typeId,
        description: this.itemDocumentAjoute.observations || '',
        regDoc: event.target.files[0],
        libelleTypeDoc : this.itemDocumentAjoute.typeDocSelected?.name,
        base64file: data,
        extension : extension?.toLowerCase()
      };
  
      this.itemDocumentAjoute = {};
      
      this.listeDocumentsAjoutes.push(currentItemImage);

      console.log(" this.listeDocumentsAjoutes ",this.listeDocumentsAjoutes);
      
      this.sendFileInMain();
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  seeDetails(document : ReglementDocument) {
    this.currentDocument = {...document};
    this.utilities.showNotification(
      "snackbar-info",
      "Cliquez sur le fichier pour fermer !", 
      "bottom",
      "center"
    );
  }

  sendFileInMain(){
    this.emitDocuments.emit(this.listeDocumentsAjoutes);
  }

  getTypeDocument() {
    this.typeDocumentService.getTypeDocument('paiements').subscribe((response : any) => {

      if (response) {
        this.listeTypesDocuments = response as typeDocument[];
      } else {
        this.listeTypesDocuments = [];
      }
    });
  }

  gotoUploadFile(){

    console.log(" this.itemDocumentAjoute ",this.itemDocumentAjoute);
    
    // Verifier si il y a un type de document selectionné
    if(!this.itemDocumentAjoute || !this.itemDocumentAjoute.typeDocSelected) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez sélectionner un type de document.",
        "bottom",
        "center"
      );
      return;
    }

    let inputFile = document.getElementById("id-joindre-file");
    if(inputFile)
    {
      inputFile.click();
    }
  }

  deleteFileInTable(indice){
    this.listeDocumentsAjoutes.splice(indice,1);
    this.sendFileInMain();
  }


  ngOnInit(): void {
    this.getTypeDocument();
  }

}
