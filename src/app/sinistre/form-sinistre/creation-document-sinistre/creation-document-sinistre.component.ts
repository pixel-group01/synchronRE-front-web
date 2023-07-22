import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentService } from 'src/app/core/service/document.service';
import * as _ from "lodash";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { UtilitiesService } from 'src/app/core/service/utilities.service';

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
  documentForm:FormGroup ;
  busySave : Subscription;
  @Input() isActiveCreationSinistre :boolean =false;

  @Output() step1: EventEmitter<number> = new EventEmitter();
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() idSinistreInDoc :number;
  @Input() itemCreationSinistre :any ;

  listesDoc :any = []
  modalRef: any;
  file64 :any
  constructor( private documentService : DocumentService,
              private formBuilder: FormBuilder,
              private utilities: UtilitiesService,
              private modalService: BsModalService,
              public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getTypeDocument();
    this.documForm();
    if (this.itemCreationSinistre) {
      console.log('doc ::',this.itemCreationSinistre);
      this.getDocumentOfSinistre()
    }  
  } 

  getTypeDocument(){
    this.documentService.typeDocument().subscribe((res:any)=>{
        console.log("res :",res);
        this.listeTypeDocument = res
    })
  } 

  closeFormModal() {
    this.modalRef.hide();
  }


  fermer(){
    this.closeModal.emit(true)
  }
  
  save(item:any){
    console.log("item ::",item);
    const data = {
      "docUniqueCode":item.uniqueCode,
      "docNum":"001",
      "docDescription":item.docDescription,
      "objectId": this.idSinistreInDoc,
      "base64UrlFile":this.currentFichier.fichierBase64,
      "extension": this.currentFichier.extension
    }
    //  console.log(data);
   this.busySave = this.documentService.create(data).subscribe((res:any)=>{
      // console.log("res file :",res);
      this.getDocumentOfSinistre()
  })
  }

  confirmSaveItem(item:any) {
    Swal.fire({
      title: "Enregistrement",
      text: "Vous êtes sur le point d'enregistrer un document sinistre. Voulez-vous poursuivre cette action ?" ,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue l'enregistrement
        this.save(item);
      }
    });
  } 

  documForm = () =>{
    this.documentForm = this.formBuilder.group({
      uniqueCode: [null,Validators.required],
      docDescription: ["",Validators.required],
    })
  }

  openModalRetourner(template: TemplateRef<any>,item:any) {
    this.previewDoc(item)
    let config = {backdrop: true, ignoreBackdropClick: true,class:'modal-width-65'};
    this.modalRef = this.modalService.show(template,config);
  }

  previewDoc(item:any){    
    this.documentService.fileBase64(item.docId).subscribe((res:any)=>{
      console.log("res down :",res);
      
      // this.file64 = this.sanitizer.bypassSecurityTrustResourceUrl(res.base64UrlString)
       // Récupérer le contenu encodé en base64
       const content = res?.base64UrlString;
       // Convertir le contenu en ArrayBuffer
       const binary = atob(content);
       const len = binary.length;
       const buffer = new ArrayBuffer(len);
       const view = new Uint8Array(buffer);
       for (let i = 0; i < len; i++) {
         view[i] = binary.charCodeAt(i);
       }
       // Créer un blob avec le contenu
       const blob = new Blob([view], { type: item.mimeTypes });
       // Créer une URL pour le blob
       const url = URL.createObjectURL(blob);
       this.file64 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    })
  }

  getExactlyNumberRow(page, index) {
    let num = index + 1;
    if (page > 1) {
      num = (page - 1) * 10 + (index + 1);
    }
    return num;
  }

  clear(){
    this.documentForm.reset()
  }

  precedent(){
    // console.log('doc 11 ::',this.itemCreationSinistre);
    this.step1.emit(this.itemCreationSinistre)
  }

  getDocumentOfSinistre(){
    this.documentService.getAllDocOfSinistre(this.idSinistreInDoc?this.idSinistreInDoc :this.itemCreationSinistre.sinId).subscribe((res:any)=>{
        // console.log("res :",res);
        this.listesDoc = res.map((item:any)=>{
          // console.log(item.docPath.split('.')[1].toLowerCase());
          
          if (item.docPath.split('.')[1].toLowerCase() == 'pdf') {
            item.mimeTypes = "application/pdf"
          }
          else {
            if (item.docPath.split('.')[1].toLowerCase() == 'png') {
              item.mimeTypes = "image/png"
            }
            else {
              if (item.docPath.split('.')[1].toLowerCase() == 'jpeg') {
                item.mimeTypes = "image/jpeg"
              }
            }
          }
          return item
        })
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
    const listeExtensionImagesValide = [{extension : "doc"},{extension : "pdf"},{extension : "jpg"},{extension : "png"},{extension : "jpeg"}] ;
    if (!_.find(listeExtensionImagesValide, { 'extension': extension.toLowerCase() })) {
      this.utilities.showNotification(
        "snackbar-danger",
        this.utilities.getMessageFileError(),
        "top",
        "center"
      );
        event.target.value = null;
        return;
    }
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
