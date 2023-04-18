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
    acl : '',
    submenu: [],
  },
  // Treso
  {
    path: "/tresorerie/main-tresorerie",
    title: "Gestion des affaires",
    moduleName: "tresorerie",
    iconType: "money-bill",
    icon: "monetization_on",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    code: "TRESO-NAV",
    submenu: [
      {
        path: "/tresorerie/main-tresorerie/mouvement-caisse",
        title: "Facultatives",
        moduleName: "main-tresorerie",
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
        path: "/tresorerie/main-tresorerie/caisse-actes-externes",
        title: "Traitées",
        moduleName: "main-tresorerie",
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
        path: "/tresorerie/main-tresorerie/caisse-actes-externes",
        title: "Réedition de bordereau",
        moduleName: "main-tresorerie",
        iconType: "list",
        icon: "plus",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        code: "TRESO-CAISSE-BUREAU-ENTREES",
        submenu: [],
      }
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
    submenu: [
      {
        path: "/parametres/administratif",
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
        path: "/parametres/bureau-entrees",
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
        path: "/parametres/gestion-commercial",
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
        path: "/parametres/unite-de-soin",
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
        path: "/parametres/unite-de-soin",
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
        path: "/parametres/unite-de-soin",
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
