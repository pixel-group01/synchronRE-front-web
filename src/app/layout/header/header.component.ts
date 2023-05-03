import { DOCUMENT } from "@angular/common";
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  AfterViewInit,
  TemplateRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/config/config.service";
import { AuthService } from "src/app/core/service/auth.service";
import { RightSidebarService } from "src/app/core/service/rightsidebar.service";
import { LanguageService } from "src/app/core/service/language.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { User } from "src/app/core/models/user";
import { ModalForgotPasswordComponent } from "src/app/authentication/signin/modal-forgot-password/modal-forgot-password.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ModalUpdatePasswordComponent } from "src/app/authentication/signin/modal-update-password/modal-update-password.component";
import { RestClientService } from "src/app/core/service/rest-client.service";
import { Subscription } from "rxjs";
const document: any = window.document;
import { interval } from "rxjs";
import * as moment from "moment";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import { PriseDeDecisionWorkflowComponent } from "src/app/shared/components/prise-de-decision-workflow/prise-de-decision-workflow.component";
import {
  enumCodeCircuitValidation,
  enumOrigineOuvertureModalForNotification,
  enumStatutAffaire,
  enumTypeRetour,
} from "src/app/core/enumerator/enumerator";
import * as _ from "lodash";
import { UserService } from "src/app/core/service/user.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit
{
  public config: any = {};
  userImg: string;
  // homePage: string = 'admin/dashbord';
  isNavbarCollapsed = true;
  flagvalue;
  modalRef?: BsModalRef;
  currentUser: User;
  countryName;
  langStoreValue: string;
  defaultFlag: string;
  isOpenSidebar: boolean;
  activeUniteFonctionnelle: any = {};
  currentTotalItems: any = 0;
  listeNotifications: any = [];
  listeActesExamens: any = [];
  busyGet: Subscription;
  user: any = {};
  codeCirucit: any = {};
  acteSelected: any = {};
  isInterpretationRadioOrLabo: boolean;

  subscribeEcouteNotification?: Subscription;
  requestRefreshNotifications?: Subscription;
  itemToSave: any = {};
  isOpen: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private rightSidebarService: RightSidebarService,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    // public languageService: LanguageService,
    private modalService: BsModalService,
    private restClient: RestClientService,
    private utilities: UtilitiesService,
    private userService: UserService
  ) {
    super();
    this.codeCirucit = enumCodeCircuitValidation;
  }

  listLang = [
    { text: "English", flag: "assets/images/flags/us.svg", lang: "en" },
    { text: "Spanish", flag: "assets/images/flags/spain.svg", lang: "es" },
    { text: "German", flag: "assets/images/flags/germany.svg", lang: "de" },
  ];

  notifications: any[] = [
    // {
    //   message: "Please check your mail",
    //   time: "14 mins ago",
    //   icon: "mail",
    //   color: "nfc-green",
    //   status: "msg-unread",
    // },
    // {
    //   message: "New Patient Added..",
    //   time: "22 mins ago",
    //   icon: "person_add",
    //   color: "nfc-blue",
    //   status: "msg-read",
    // },
    // {
    //   message: "Your leave is approved!! ",
    //   time: "3 hours ago",
    //   icon: "event_available",
    //   color: "nfc-orange",
    //   status: "msg-read",
    // },
    // {
    //   message: "Lets break for lunch...",
    //   time: "5 hours ago",
    //   icon: "lunch_dining",
    //   color: "nfc-blue",
    //   status: "msg-read",
    // },
    // {
    //   message: "Patient report generated",
    //   time: "14 mins ago",
    //   icon: "description",
    //   color: "nfc-green",
    //   status: "msg-read",
    // },
    // {
    //   message: "Please check your mail",
    //   time: "22 mins ago",
    //   icon: "mail",
    //   color: "nfc-red",
    //   status: "msg-read",
    // },
    // {
    //   message: "Salary credited...",
    //   time: "3 hours ago",
    //   icon: "paid",
    //   color: "nfc-purple",
    //   status: "msg-read",
    // },
  ];

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUserInfo();

    console.log(" this.currentUser ",this.currentUser);
    if(this.currentUser && this.currentUser?.cedId) {
      this.refreshDataNotification();
    }
  }

  getNotificationCedenteAffaireRetourner(){
    this.restClient.get('affaires/facultative/by-cedante').subscribe(
      (response : any) => {
        console.log(" Retour du service ",response);
        this.listeNotifications = [];
        if(response['content'] && response['content'].length > 0) {
          let results =  _.filter(response['content'], (o)=> { return o.statutCode?.toLowerCase() === enumStatutAffaire?.RETOURNER?.toLowerCase() });

          if(results && results.length > 0){
            this.listeNotifications.push({
              message : "Vous avez "+(results.length)+ " affaire(s) retournée(s) par NELSONRE",
            })
          }
        }

      }
    )
  }

  refreshDataNotification() {
    this.getNotificationCedenteAffaireRetourner();
    this.requestRefreshNotifications = interval( 5 * 1000) /* On actualise chaque 5 sécondes */
      .subscribe(i => {
        this.getNotificationCedenteAffaireRetourner()
      })
  }

  openModal(data: any, template: TemplateRef<any>) {
    let config = { backdrop: true, ignoreBackdropClick: true };

    if (data) {
      // Lorsque nous sommes en modification
      this.itemToSave = {
        listeItemByOrigine: data.medicaments || [],
        itemPriseDecisionByOrigine: null,
        origine: data?.code,
      };
    }

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, config, { class: "modal-lg modal-width-75" })
    );
  }

  closeItemTraitement() {
    this.modalRef.hide();
  }

  /** On implemente un timer qui va tourner par intervalle de temps */
  openToogle(isOpen) {
    console.log(" isOpen ", isOpen);

    // if(!isOpen) {
    //   // En ce moment le modal vient de se fermer je marque estOuvert true
    //   setTimeout(() => {
    //     this.updateIsOuverNotification();
    //   }, 2000);
    // }
  }



  ngAfterViewInit() {
    // set theme on startup
    // if (localStorage.getItem("theme")) {
    //   this.renderer.removeClass(this.document.body, this.config.layout.variant);
    //   this.renderer.addClass(this.document.body, localStorage.getItem("theme"));
    // } else {
    //   this.renderer.addClass(this.document.body, this.config.layout.variant);
    // }

    if (localStorage.getItem("menuOption")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("menuOption")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "menu_" + this.config?.layout?.sidebar?.backgroundColor
      );
    }

    if (localStorage.getItem("choose_logoheader")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("choose_logoheader")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "logo-" + this.config?.layout?.logo_bg_color
      );
    }

    if (localStorage.getItem("sidebar_status")) {
      if (localStorage.getItem("sidebar_status") === "close") {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      } else {
        this.renderer.removeClass(this.document.body, "side-closed");
        this.renderer.removeClass(this.document.body, "submenu-closed");
      }
    } else {
      if (this.config?.layout?.sidebar?.collapsed === true) {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      }
    }
  }
  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    // this.languageService.setLanguage(lang);
  }
  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains("side-closed");
    if (hasClass) {
      this.renderer.removeClass(this.document.body, "side-closed");
      this.renderer.removeClass(this.document.body, "submenu-closed");
    } else {
      this.renderer.addClass(this.document.body, "side-closed");
      this.renderer.addClass(this.document.body, "submenu-closed");
    }
  }
  logout() {
    this.userService.removeCurrentUser();
    this.router.navigate(["/authentication/signin"]);
    // this.subs.sink = this.authService.logout().subscribe((res) => {
    //   if (!res.success) {
    //     this.router.navigate(["/authentication/signin"]);
    //   }
    // });
  }

  updatePassword() {
    let modal: any;
    modal = ModalUpdatePasswordComponent;
    this.modalRef = this.modalService.show(modal, {
      id: 1,
      class: "modal-custom",
      // data:boulangerie
    });
    // if (data) this.modalRef.content.currentData = data;
    this.modalRef.onHide.subscribe((res) => {
      console.log("hidden");
      // this.getData();
    });
  }

  ngOnDestroy() {
    if (this.requestRefreshNotifications) {
      this.requestRefreshNotifications.unsubscribe();
    }
  }
}
