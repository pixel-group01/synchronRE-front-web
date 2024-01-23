import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { DocumentService } from "src/app/core/service/document.service";
import * as _ from "lodash";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { BsModalService } from "ngx-bootstrap/modal";
import Swal from "sweetalert2";
import { UtilitiesService } from "src/app/core/service/utilities.service";

@Component({
  selector: "app-creation-document-sinistre",
  templateUrl: "./creation-document-sinistre.component.html",
  styleUrls: ["./creation-document-sinistre.component.scss"],
})
export class CreationDocumentSinistreComponent implements OnInit {
  listeTypeDocument: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalItems: number;
  currentFichier: any = {};
  documentForm: FormGroup;
  busySave: Subscription;
  @Input() isActiveCreationSinistre: boolean = false;
  @Input() notNeedBtnFooter: boolean = false;
  @Input() isSinistre: boolean = false;
  itemToSearch: any = {};

  infoDocInPreview :any;
  @Output() step1: EventEmitter<number> = new EventEmitter();
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() idSinistreInDoc: number;
  @Input() idAffaire: number;
  @Input() idOrigine:number;
  @Input() origine:string;
  @Input() itemCreationSinistre: any;
  @Input() itemPaiement: any;
  @Input() isPaiement: boolean;
  @ViewChild("fileInput") fileInput: any;

  listesDoc: any = [];
  modalRef: any;
  file64: any;
  constructor(
    private documentService: DocumentService,
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private modalService: BsModalService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getTypeDocument();
    this.documForm();
    if (this.itemCreationSinistre || this.idAffaire || this.isPaiement) {
      this.getDocumentdejaJoint();
    }
  }

  getTypeDocument() {
    if (this.isSinistre) {
      this.documentService.typeDocument().subscribe((res: any) => {
        this.listeTypeDocument = res;
      });
    }
    if (this.idAffaire) {
      this.documentService.typeDocumentAffaire().subscribe((res: any) => {
        this.listeTypeDocument = res;
      });
    }

    if(this.isPaiement) {
      this.documentService.typeDocumentPaiement().subscribe((res: any) => {
        this.listeTypeDocument = res;
      });
    }

    if (this.idSinistreInDoc > 0 || this.itemCreationSinistre?.sinId > 0) {
      // En ce moment il s'afgit d'un sinistre on recupere les documents lié au fond documentaire
      // Du sinistre

      this.documentService.typeDocument().subscribe((res: any) => {
      console.log("doc sin :",res);
        this.listeTypeDocument = res;
      });
    }
  }

  closeFormModal() {
    this.modalRef.hide();
  }

  fermer() {
    this.closeModal.emit(true);
  }

  save(item: any) {
    if (this.itemPaiement) {
      this.idSinistreInDoc = this.itemPaiement.regId
    }
    const data = {
      docName : item.docName ?  item.docName : this.currentFichier.fileName,
      docNum :  item.docNum ? item.docNum : "",
      docId: item.docId ? item.docId : "",
      docUniqueCode: item.uniqueCode,
      docDescription: item.docDescription,
      objectId: this.idOrigine || ( !this.idAffaire
        ? this.idSinistreInDoc
          ? this.idSinistreInDoc
          : this.itemCreationSinistre.sinId
        : this.idAffaire),
      base64UrlFile: this.currentFichier.fichierBase64,
      extension: this.currentFichier.extension,
    };

    if(!this.isPaiement) {
      this.busySave = (this.documentForm.value.docId ? this.documentService.modificationDoc(data) : (!this.idAffaire ? (this.documentService.create(data)) : this.documentService.createDocAff(data))).subscribe((res: any) => {
        console.log("res file :", res);
        if (res === true) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull(),
            "top",
            "center"
          );
          this.getDocumentdejaJoint();
          this.clear();
        }
      });
    }else{

      this.busySave = (this.documentForm.value.docId ? this.documentService.modificationDoc(data) : this.documentService.createWithParameter(data,this.origine)).subscribe((res: any) => {

        if (res === true) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull(),
            "top",
            "center"
          );
          this.getDocumentdejaJoint();
          this.clear();
        }
      });

    }


  }

  confirmSaveItem(item: any) {
    if(!this.currentFichier || !this.currentFichier.fichierBase64) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez sélectionner le fichier à joindre !",
        "top",
        "center"
      );
      return
    }
    Swal.fire({
      title: "Enregistrement",
      text: item.docId? "Vous êtes sur le point de modifier un document. Voulez-vous poursuivre cette action ?" :
              "Vous êtes sur le point d'enregistrer un document. Voulez-vous poursuivre cette action ?",
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

  confirmDeleteDoc(item: any) {
    Swal.fire({
      title: "Suppression",
      text: "Vous êtes sur le point de supprimer un document du sinistre. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue un delete document
        this.deleteDoc(item);
      }
    });
  }

  documForm = () => {
    this.documentForm = this.formBuilder.group({
      uniqueCode: [null, Validators.required],
      docDescription: ["", Validators.required],
      mineType: [""],
      docId: [""],
      docName: [""],
      docNum : [""],
    });
  };

  openModalDetail(template: TemplateRef<any>, item: any) {
    this.previewDoc(item);
    this.infoDocInPreview = item;
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-width-65",
    };
    this.modalRef = this.modalService.show(template, config);
  }

  previewDoc(item: any) {
    this.documentService.fileBase64(item.docId).subscribe((res: any) => {
      console.log("res down :", res);
      this.documentForm.value.mineType = item.mimeTypes;
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

      // window.open(this.file64.changingThisBreaksApplicationSecurity, '_blank');

    });
  }

  getExactlyNumberRow(page, index) {
    let num = index + 1;
    if (page > 1) {
      num = (page - 1) * this.itemsPerPage + (index + 1);
    }
    return num;
  }

  clear() {
    this.documentForm.reset();
    this.fileInput.nativeElement.value = "";
  }

  precedent() {
    // console.log('doc 11 ::',this.itemCreationSinistre);
    this.step1.emit(this.itemCreationSinistre);
  }

  upItemUpdateDoc(item: any) {
    // console.log("item :", item);
    item.uniqueCode = item.docUniqueCode
    this.documentForm.patchValue({ ...item });
  }

  getDocumentdejaJoint() {
    if (this.idAffaire) {
      this.documentService
        .getDocumentByAffaire(this.idAffaire)
        .subscribe((res: any) => {
          if (res.content) {
            this.listesDoc = res.content.map((item: any) => {
              item.mimeTypes = this.getTypeFile(item);
              return item;
            });
          }
        });
    } else {
      if(this.isPaiement) {
        this.documentService
        .getDocumentByPaiement(this.idOrigine)
        .subscribe((res: any) => {
          if (res.content) {
            this.listesDoc = res.content.map((item: any) => {
              item.mimeTypes = this.getTypeFile(item);
              return item;
            });
          }
        });
      }else{
        let endPoint: any = this.idSinistreInDoc
      ? this.idSinistreInDoc
      : this.itemCreationSinistre.sinId +
        "?page=" +
        `${this.currentPage - 1}` +
        "&size=" +
        this.itemsPerPage +
        (this.itemToSearch.libelle ? "&key=" + this.itemToSearch.libelle : "");

      this.documentService
        .getAllDocOfSinistre(endPoint)
        .subscribe((res: any) => {
          console.log("res :", res);
          if (res.content) {
            this.listesDoc = res.content.map((item: any) => {
              item.mimeTypes = this.getTypeFile(item);
              return item;
            });
          }
        });
       }
      }

  }

  getTypeFile(item: any) {
    if (item.docPath.split(".")[1].toLowerCase() == "pdf") {
      item.mimeTypes = "application/pdf";
    } else {
      if (item.docPath.split(".")[1].toLowerCase() == "png") {
        item.mimeTypes = "image/png";
      } else {
        if (item.docPath.split(".")[1].toLowerCase() == "jpeg") {
          item.mimeTypes = "image/jpeg";
        }
      }
    }

    return item.mimeTypes;
  }

  deleteDoc(item: any) {
    this.busySave = this.documentService.delete(item).subscribe((res: any) => {
      // console.log('res delete ', res);
      this.getDocumentdejaJoint();
    });
  }

  uploadFile(event: any) {
    let item = {
      fileName: null,
      fileBase64: null,
    };
    let reader = new FileReader();
    let file = event.target.files[0];

    item.fileName = file.name;
    let Tabextension = file.name.split(".");
    let extension = Tabextension[Tabextension.length - 1];

    // verifier si l'extension est accepter
    const listeExtensionImagesValide = [
      { extension: "doc" },
      { extension: "pdf" },
      { extension: "jpg" },
      { extension: "png" },
      { extension: "jpeg" },
    ];
    if (
      !_.find(listeExtensionImagesValide, {
        extension: extension.toLowerCase(),
      })
    ) {
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
      item.fileBase64 = data.split(",")[1];

      this.currentFichier = {
        fichierBase64: item.fileBase64,
        fileName: item.fileName,
        extension: extension,
        fullBase64: data,
        dataPdf: this.sanitizer.bypassSecurityTrustResourceUrl(data),
        fichier: file,
      };
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
