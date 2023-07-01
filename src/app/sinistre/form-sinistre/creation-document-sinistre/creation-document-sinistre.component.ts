import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentService } from 'src/app/core/service/document.service';
import * as _ from "lodash";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-creation-document-sinistre',
  templateUrl: './creation-document-sinistre.component.html',
  styleUrls: ['./creation-document-sinistre.component.scss']
})
export class CreationDocumentSinistreComponent implements OnInit {
  listeTypeDocument:any=[]
  items :any =[{}];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number; 
  currentFichier : any ={};
  documentForm:FormGroup 

  constructor( private documentService : DocumentService,
              private formBuilder: FormBuilder,
              public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getTypeDocument();
    this.getDocumentOfSinistre();
    this.documForm()
  } 

  getTypeDocument(){
    this.documentService.typeDocument().subscribe((res:any)=>{
        console.log("res :",res);
        this.listeTypeDocument = res
    })
  }

  save(item:any){
    console.log("item ::",item);
    
    const fd = new FormData();
    fd.append('typeDocUniqueCode',item.uniqueCode);
    fd.append('docNum',"1");
    fd.append('docDescription',"un test");
    fd.append('objectId', "1");
    fd.append('file', this.currentFichier.fichier);
    this.documentService.create(fd).subscribe((res:any)=>{
      console.log("res fb :",res);
  })
  }

  documForm = () =>{
    this.documentForm = this.formBuilder.group({
      uniqueCode: [null,Validators.required],
      docDescription: ["",Validators.required],
    })
  }

  getDocumentOfSinistre(item:any=1){
    this.documentService.getAllDocOfSinistre(item).subscribe((res:any)=>{
        console.log("res :",res);
    })
  }

  uploadFile(event: any) {
    let item = {
      fileName: null,
      fileBase64: null
    };
    let reader = new FileReader();
    let file = event.target.files[0];
  
    item.fileName = file.name;
    let Tabextension = file.name.split('.');
    let extension = Tabextension[Tabextension.length - 1];
  
   // verifier si l'extension est accepter 
    const listeExtensionImagesValide = [{extension : "pdf"},{extension : "jpg"},{extension : "png"},{extension : "jpeg"}] ;
    // if (!_.find(listeExtensionImagesValide, { 'extension': extension.toLowerCase() })) {
    //   this.toastr.error("Veuillez sélectionner une extension valide SVP!");
    //     event.target.value = null;
    //     return;
    // }
    reader.onload = (readerEvent) => {
      let data = (readerEvent.target as any).result;
      item.fileBase64 = data.split(',')[1];
    
      this.currentFichier = {
        fichierBase64: item.fileBase64,
        fileName: item.fileName,
        extension: extension,
        fullBase64: data,
        dataPdf : this.sanitizer.bypassSecurityTrustResourceUrl(data),
        fichier : file
      };
      console.log("currentItemFichierCourrierClient ",this.currentFichier);
    }
    reader.readAsDataURL(event.target.files[0]);
  }

}
