import { Component, Input, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-details-documents-joints",
  templateUrl: "./details-documents-joints.component.html",
  styleUrls: ["./details-documents-joints.component.scss"],
})
export class DetailsDocumentsJointsComponent implements OnInit {

  @Input() listeAutresDocuments;
  @Input() defautImageSelected;
  isBigger : boolean = false;
  currentImageSelected: any = {};
  currentClasse = "rotate360";
  currentIndice: any;
  zoomWidthValue: any = "100%";
  bsModalRefPreview: BsModalRef;

  config = {
    animated: true,
    keyboard: false,
    backdrop: "static",
    ignoreBackdropClick: true,
  };

  constructor(private modalService: BsModalService) {
  
  }

  ngOnInit() {
    this.selecteItemDocument(0);

    console.log(" listeAutresDocuments ",this.listeAutresDocuments);
    
  }

  ngAfterViewInit(): void {
    var elmnt = document.getElementById("cadre-presentation-images");
    elmnt.scrollTo({
      top: this.listeAutresDocuments.indexOf(this.defautImageSelected) * 150,
      left: 100,
      behavior: "smooth",
    });
  }

  setZoomValue(zoomPlus) {
    // Recuperer l'id de l'image
    let idImageAffiche = document.getElementById("imageAffiche");

    if (zoomPlus) {
      idImageAffiche.style.width =
        (
          parseInt(idImageAffiche.style.width.toString().replace("%", "")) + 20
        ).toString() + "%";
    } else {
      // On verifie voir si on peut tjrs zoomer
      if (parseInt(idImageAffiche.style.width) > 20) {
        idImageAffiche.style.width =
          (
            parseInt(idImageAffiche.style.width.toString().replace("%", "")) -
            20
          ).toString() + "%";
      }
    }

    this.zoomWidthValue = idImageAffiche.style.width;
  }

  openFileInUrl() {
    window.open(this.currentImageSelected.url, "_blank");
  }

  selecteItemDocument(indice, nextOrPrecedent?) {
    this.currentIndice = indice;
    let imageSelected = this.listeAutresDocuments[indice];

    // if(imageSelected.isPdf){
    //   this.bsModalRefPreview = this.modalService.show(FormPreviewPrintComponent, Object.assign({}, this.config, { class: 'gray modal-lg modal-custom-preview' }));
    //   this.bsModalRefPreview.content.currentLink = imageSelected.url;
    // }

    this.currentImageSelected = this.listeAutresDocuments[indice];

    if (nextOrPrecedent) {
      var elmnt = document.getElementById("cadre-presentation-images");
      elmnt.scrollTo({
        top: indice * 150,
        left: 100,
        behavior: "smooth",
      });
    }
  }

  gotoRotateFile() {
    switch (this.currentClasse) {
      case "rotate360":
        this.currentClasse = "rotate90";
        break;

      case "rotate90":
        this.currentClasse = "rotate180";
        break;

      case "rotate180":
        this.currentClasse = "rotate270";
        break;

      case "rotate270":
        this.currentClasse = "rotate360";
        break;

      default:
        this.currentClasse = "rotate360";
    }
  }
}
