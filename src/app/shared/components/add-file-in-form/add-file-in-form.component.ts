import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as _ from "lodash";
import { UtilitiesService } from 'src/app/core/service/utilities.service';

@Component({
  selector: 'app-add-file-in-form',
  templateUrl: './add-file-in-form.component.html',
  styleUrls: ['./add-file-in-form.component.scss']
})
export class AddFileInFormComponent implements OnInit {

  @Output() emitDocuments: EventEmitter<any> = new EventEmitter();

  listeDocumentsAjoutes : any = [];

  itemDocumentAjoute : any = {};
  listeTypesDocuments : any = [];

  constructor(private utilities: UtilitiesService) { }


  addDocument(){

  }


  uploadFile(event: any) {
    let item = {
      fileName: null,
      fileBase64: null
    };
    let reader = new FileReader();

    let file = event.target.files[0];

    if (file.size > 1000000) {
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
    
      item.fileBase64 = data.split(',')[1];
      let currentItemImage = {
        fileBase64: item.fileBase64,
        nomFichier: item.fileName,
        extension: extension,
        fullBase64 : data,
        fileName:item.fileName,
        typeDocument:extension?.toLowerCase() == "pdf" ? "PDF" : "IMG"
      };

      this.listeDocumentsAjoutes.push(currentItemImage);
      this.sendFileInMain();
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  sendFileInMain(){
    this.emitDocuments.emit(this.listeDocumentsAjoutes);
  }

  gotoUploadFile(){
    let inputFile = document.getElementById("id-joindre-file");
    if(inputFile)
    {
      inputFile.click();
    }
  }

  deleteImg(indice){
    this.listeDocumentsAjoutes.splice(indice,1);
    this.sendFileInMain();
  }


  ngOnInit(): void {
  }

}
