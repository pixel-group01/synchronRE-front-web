import { enumCodeACL } from "src/app/core/enumerator/enumerator";
import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  // Tableau de bord
  {
    path: "/admin/dashboard/main",
    title: "Tableau de bord",
    moduleName: "dashboard",
    iconType: "home",
    icon: "tachometer",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    code: "DASHBORD-NAV",
    acl: "",
    codeAclAdmin: enumCodeACL.ADMIN,
    codeAclCedente: enumCodeACL.CEDANTE,
    submenu: [],
  },
  // Affaire
  {
    path: "",
    title: "Production",
    moduleName: "business",
    iconType: "money-bill",
    icon: "monetization_on",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    code: "TRESO-NAV",
    codeAclAdmin: enumCodeACL.ADMIN,
    codeAclCedente: enumCodeACL.CEDANTE,
    submenu: [
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
        code: "TRESO-MOUVEMENT-CAISSE",
        submenu: [],
      },
      {
        path: "/business/affaire-traitee",
        title: "Traitées",
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
    ],
  },

  // Affaire
  {
    path: "",
    title: "Sinistre",
    moduleName: "sinistre",
    iconType: "money-bill",
    icon: "monetization_on",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    code: "TRESO-NAV",
    codeAclAdmin: enumCodeACL.ADMIN,
    codeAclCedente: enumCodeACL.CEDANTE,
    submenu: [
      {
        path: "/business/affaire-facultatives",
        title: "Déclaration",
        moduleName: "business",
        iconType: "list",
        icon: "plus",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "TRESO-MOUVEMENT-CAISSE",
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

  {
    path: "/archives",
    title: "Archives",
    moduleName: "archives",
    iconType: "list",
    icon: "tachometer",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    code: "DASHBORD-NAV",
    acl: "",
    codeAclAdmin: enumCodeACL.ADMIN,
    codeAclCedente: enumCodeACL.CEDANTE,
    submenu: [],
  },

  // Comptabilité
  {
    path: "",
    title: "Comptabilité",
    moduleName: "gestion-administrative",
    iconType: "clock",
    icon: "plus",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    codeAclAdmin: enumCodeACL.ADMIN,
    code: "GEST-ADMINISTRATIVE-NAV",
    submenu: [
      {
        path: "/gestion-administrative/gestion-vacations",
        title: "Facultative",
        moduleName: "gestion-vacations",
        iconType: "list",
        icon: "plus",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GEST-ADMINISTRATIVE-GESTION-VACATIONS",
        submenu: [
          {
            path: "/gestion-administrative/gestion-vacations/vacataire",
            title: "Paiement",
            moduleName: "gestion-vacations",
            iconType: "list",
            icon: "",
            class: "ml-menu",
            groupTitle: false,
            badge: "",
            badgeClass: "",
            code: "GEST-ADMINISTRATIVE-GESTION-VACATIONS-VACATAIRE",
            submenu: [],
          },
          {
            path: "/gestion-administrative/gestion-vacations/vacations",
            title: "Reversement",
            moduleName: "gestion-vacations",
            iconType: "list",
            icon: "",
            class: "ml-menu",
            groupTitle: false,
            badge: "",
            badgeClass: "",
            code: "GEST-ADMINISTRATIVE-GESTION-VACATIONS-VACATION",
            submenu: [],
          },
        ],
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
        code: "GEST-ADMINISTRATIVE-PRISE-RENDEZ-VOUS",

        submenu: [
          {
            path: "",
            title: "Paiement",
            moduleName: "rdv",
            iconType: "list",
            icon: "",
            class: "ml-menu",
            groupTitle: false,
            badge: "",
            badgeClass: "",
            // code: "82209945",
            submenu: [],
          },
          {
            path: "/gestion-administrative/planning/consulter-rdv",
            title: "Reversement",
            moduleName: "rdv",
            iconType: "list",
            icon: "",
            class: "ml-menu",
            groupTitle: false,
            badge: "",
            badgeClass: "",
            // code: "82209945",
            submenu: [],
          },
        ],
      },
      {
        path: "",
        title: "Sinistre",
        moduleName: "rdv",
        iconType: "list",
        icon: "plus",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "GEST-ADMINISTRATIVE-PRISE-RENDEZ-VOUS",

        submenu: [
          {
            path: "",
            title: "Règlements",
            moduleName: "rdv",
            iconType: "list",
            icon: "",
            class: "ml-menu",
            groupTitle: false,
            badge: "",
            badgeClass: "",
            // code: "82209945",
            submenu: [],
          },
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
    code: "PARAM-NAV",
    codeAclAdmin: enumCodeACL.ADMIN,
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
        code: "PARAM-ADMINISTRATIF",
        submenu: [],
      },
      {
        path: "/parametres/statut",
        title: "Statuts",
        moduleName: "parametres",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "PARAM-BUREAU-ENTRESS",
        submenu: [],
      },
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
        code: "PARAM-GESTION-COMMERCIALE",
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
        code: "PARAM-UNITE-SOIN",
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
        code: "PARAM-GESTION-COMMERCIALE",
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
        code: "PARAM-UNITE-SOIN",
        submenu: [],
      },
      {
        path: "/parametres/cedente",
        title: "Cédentes",
        moduleName: "parametres",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "PARAM-UNITE-SOIN",
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
    code: "ADMIN-NAV",
    codeAclAdmin: enumCodeACL.ADMIN,
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
        code: "ADMIN-USERS",
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
        code: "ADMIN-ROLE",
        submenu: [],
      },
      {
        path: "/administration/fonctionnalites",
        title: "Fonctionnalites",
        moduleName: "administration",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        // code: "73166694",
        submenu: [],
      },
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
        code: "ADMIN-HISTORIQUE-CONNEXION",
        submenu: [],
      },
    ],
  },
];
