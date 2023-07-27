import { enumCodeACL } from "src/app/core/enumerator/enumerator";
import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  // Tableau de bord
  // {
  //   path: "",
  //   title: "Statistique",
  //   moduleName: "dashboard",
  //   iconType: "home",
  //   icon: "tachometer",
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   code: "MENU_STAT",
  //   acl: "",
  //   // codeAclAdmin: enumCodeACL.ADMIN,
  //   // codeAclCedente: enumCodeACL.CEDANTE,
  //   submenu: [
  //     {
  //       path: "/business/affaire-traitee",
  //       title: "Traitées",
  //       moduleName: "dashboard",
  //       iconType: "list",
  //       icon: "plus",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       // codeX: "TRESO-CAISSE-BUREAU-ENTREES",
  //       submenu: [],
  //     }
  //   ],
  // },

   // Statistique
   {
    path: "",
    title: "Statistique",
    moduleName: "dashbord",
    iconType: "home",
    icon: "monetization_on",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    code: "MENU_STAT",
    submenu: [
      {
        path: "/dashbord/affaire-traite",
        title: "Traités",
        moduleName: "dashbord",
        iconType: "list",
        icon: "plus",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-STAT-TRAI",
        submenu: [],
      },
      {
        path: "/dashbord/affaire-facultative",
        title: "Facultatives",
        moduleName: "dashbord",
        iconType: "list",
        icon: "plus",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-STAT-FAC",
        submenu: [],
      },
      {
        path: "/dashbord/sinistre-traite",
        title: "Sinistres traités",
        moduleName: "dashbord",
        iconType: "list",
        icon: "plus",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-STAT-SIN-FAC",
        submenu: [],
      },
      {
        path: "/dashbord/sinistre-facultatif",
        title: "Sinistres facultatifs",
        moduleName: "dashbord",
        iconType: "list",
        icon: "plus",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-STAT-SIN-TRAI",
        submenu: [],
      }
    ],
  },

  // Affaire mise en commentaire 
  {
    path: "",
    title: "Production",
    moduleName: "business",
    iconType: "clock",
    icon: "monetization_on",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    code: "MENU_PROD",
    submenu: [
      {
        path: "/business/affaire-traitee",
        title: "Traités",
        moduleName: "business",
        iconType: "list",
        icon: "plus",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "TRESO-CAISSE-BUREAU-ENTREES",
        submenu: [],
      },
      {
        path: "/business/affaire-facultatives",
        title: "Facultatives",
        moduleName: "business",
        iconType: "list",
        icon: "plus",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-FAC-LST",
        submenu: [],
      }
    ],
  },

  // Affaire mise en commentaire
  {
    path: "",
    title: "Sinistres",
    moduleName: "sinistres",
    iconType: "money-bill",
    icon: "monetization_on",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    code: "MENU_SIN",
    submenu: [
      {
        path: "/sinistres/declarations",
        title: "Déclaration",
        moduleName: "business",
        iconType: "list",
        icon: "plus",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-SIN-LST",
        submenu: [],
      },
      // {
      //   path: "/tresorerie/main-tresorerie/caisse-actes-externes",
      //   title: "Traitées",
      //   moduleName: "main-tresorerie",
      //   iconType: "list",
      //   icon: "plus",
      //   class: "ml-menu",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   code: "TRESO-CAISSE-BUREAU-ENTREES",
      //   submenu: [],
      // },
      // {
      //   path: "/tresorerie/main-tresorerie/caisse-actes-externes",
      //   title: "Réedition de bordereau",
      //   moduleName: "main-tresorerie",
      //   iconType: "list",
      //   icon: "plus",
      //   class: "ml-menu",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   code: "TRESO-CAISSE-BUREAU-ENTREES",
      //   submenu: [],
      // }
    ],
  },

  // Comptabilité mis en commentaire
  {
    path: "",
    title: "Comptabilité",
    moduleName: "comptabilites",
    iconType: "money-bill",
    icon: "plus",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    code: "MENU_COMPTA",
    submenu: [
      {
        path: "/comptabilites/affaires",
        title: "Affaires facultatives",
        moduleName: "business",
        iconType: "list",
        icon: "plus",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-REG-FAC-LST",
        submenu: [],
      },

      {
        path: "",
        title: "Traité",
        moduleName: "rdv",
        iconType: "list",
        icon: "plus",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-REG-TRAI-LST",
        submenu: [
          // {
          //   path: "",
          //   title: "Paiement",
          //   moduleName: "rdv",
          //   iconType: "list",
          //   icon: "",
          //   class: "ml-menu",
          //   groupTitle: false,
          //   badge: "",
          //   badgeClass: "",
          //   // code: "82209945",
          //   submenu: [],
          // },
          // {
          //   path: "/gestion-administrative/planning/consulter-rdv",
          //   title: "Reversement",
          //   moduleName: "rdv",
          //   iconType: "list",
          //   icon: "",
          //   class: "ml-menu",
          //   groupTitle: false,
          //   badge: "",
          //   badgeClass: "",
          //   // code: "82209945",
          //   submenu: [],
          // },
        ],
      },
      {
        path: "/comptabilites/sinistres",
        title: "Sinistres",
        moduleName: "business",
        iconType: "list",
        icon: "plus",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-REG-SIN-LST",
        submenu: [
          // {
          //   path: "",
          //   title: "Règlements",
          //   moduleName: "rdv",
          //   iconType: "list",
          //   icon: "",
          //   class: "ml-menu",
          //   groupTitle: false,
          //   badge: "",
          //   badgeClass: "",
          //   // code: "82209945",
          //   submenu: [],
          // },
        ],
      },
    ],
  },

  // Parametre acl ok
  {
    path: "",
    title: "Paramètres",
    moduleName: "parametres",
    iconType: "cog",
    icon: "description",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    code: "MENU_PARAM",
    submenu: [
      {
        path: "/parametres/country",
        title: "Pays",
        moduleName: "parametres",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-PAY-LST",
        submenu: [],
      },
      // {
      //   path: "/parametres/statut",
      //   title: "Statuts",
      //   moduleName: "parametres",
      //   iconType: "",
      //   icon: "",
      //   class: "ml-menu",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   code: "PARAM-BUREAU-ENTRESS",
      //   submenu: [],
      // },
      {
        path: "/parametres/branche",
        title: "Branche",
        moduleName: "parametres",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-BRAN-LST",
        submenu: [],
      },
      {
        path: "/parametres/cession-legal",
        title: "Cession legale",
        moduleName: "parametres",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-CES-LEG-PARAM-LST",
        submenu: [],
      },
      {
        path: "/parametres/bank",
        title: "Banque",
        moduleName: "parametres",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-BANK-LST",
        submenu: [],
      },
      {
        path: "/parametres/couverture",
        title: "Couverture",
        moduleName: "parametres",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-COUV-LST",
        submenu: [],
      },
      {
        path: "/parametres/cedante",
        title: "Cédantes",
        moduleName: "parametres",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-CED-LST",
        submenu: [],
      },
      {
        path: "/parametres/cessionnaire",
        title: "Cessionnaires",
        moduleName: "parametres",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-CES-LST",
        submenu: [],
      },
    ],
  },

  // Administration acl ok
  {
    path: "",
    title: "Administration",
    moduleName: "administration",
    iconType: "lock",
    icon: "description",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    code: "MENU_ADMIN",
    submenu: [
      {
        path: "/administration/utilisateurs",
        title: "Utilisateurs",
        moduleName: "administration",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-USER-LST",
        submenu: [],
      },
      {
        path: "/administration/roles",
        title: "Roles",
        moduleName: "administration",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-ROL-LST",
        submenu: [],
      },
      // {
      //   path: "/administration/fonctionnalites",
      //   title: "Fonctionnalites",
      //   moduleName: "administration",
      //   iconType: "",
      //   icon: "",
      //   class: "ml-menu",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   // code: "73166694",
      //   submenu: [],
      // },
      // {
      //   path: "/administration/logs",
      //   title: "Logs",
      //   moduleName: "administration",
      //   iconType: "",
      //   icon: "",
      //   class: "ml-menu",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   code: "GET-USER-LST",
      //   submenu: [],
      // },
      {
        path: "/administration/historique-connexion",
        title: "Historique connexion",
        moduleName: "administration",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-USER-LST",
        submenu: [],
      },
       {
        path: "/administration/logs-system",
        title: "Logs système",
        moduleName: "administration",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GET-USER-LST",
        submenu: [],
      }
      
    ],
  },
];
