import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs/internal/Subscription";
import { AuthService } from "src/app/core/service/auth.service";
import { RestClientService } from "src/app/core/service/rest-client.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";

@Component({
  selector: "app-form-preview-pdf",
  templateUrl: "./form-preview-pdf.component.html",
  styleUrls: ["./form-preview-pdf.component.scss"],
})
export class FormPreviewPdfComponent implements OnInit {
  itemToSave: any;
  endPointReport: any;
  currentLink: any;
  typeFile: String = "";
  isGenererQuitus: boolean = false;
  user: any = {};
  currentPrestataire: any = {};
  busySave: Subscription;
  titleReportDocumentSortie: string;

  constructor(
    public sanitizer: DomSanitizer,
    private restClient: RestClientService,
    public bsModalRefPreview: BsModalRef,
    public router: Router,
    private utilities: UtilitiesService,
    private userService: AuthService
  ) {
    this.user = this.userService.currentUserValue;
    this.itemToSave = { isReady: false };
    this.getCurrentFile();
  }

  gotoDashbordPage() {
    this.hideModale();
    this.router.navigate(["/dashbord"]);
  }

  getCurrentFile() {
   

    setTimeout(() => {
      let link = this.currentLink;
      this.cleanURL(link);
    }, 1000);
  }

  cleanURL(oldURL) {
    try {
      if (!this.itemToSave.isReady && oldURL) {
        this.itemToSave.isReady = true;
        this.itemToSave.fileUrlFinale = this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
      }
    } catch (error) {
      
    }
   
  }

  hideModale() {
    // this.bsModalRefPreview.content.isSave = false;
    this.bsModalRefPreview.hide();
  }

  ngOnInit() { }
}
