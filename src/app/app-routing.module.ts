import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./authentication/page404/page404.component";
import { AuthGuard } from "./core/guard/auth.guard";
import { Role } from "./core/models/role";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/authentication/signin", pathMatch: "full" },
      {
        path: "dashbord",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
        import("./dashbord-synchrore/dashbord-synchrore.module").then(
          (m) => m.DashbordSynchroreModule
        ),

        // loadChildren: () => 
        //   import("./dashbord/admin.module").then((m) => m.AdminModule),
      },
      {
        path: "extra-pages",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./extra-pages/extra-pages.module").then(
            (m) => m.ExtraPagesModule
          ),
      },
      {
        path: "business",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./business-manager/business-manager.module").then(
            (m) => m.BusinessManagerModule
          ),
      },
      {
        path: "sinistres",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./sinistre/sinistre.module").then(
            (m) => m.SinistreModule
          ),
      },
      {
        path: "archives",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./archives/archives.module").then(
            (m) => m.ArchivesModule
          ),
      },
      {
        path: "comptabilites",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./comptabilite/comptabilite.module").then(
            (m) => m.ComptabiliteModule
          ),
      },

      {
        path: "traites",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./traites/traite.module").then(
            (m) => m.TraiteModule
          ),
      },

      {
        path: "parametres",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./parametres/parametres.module").then(
            (m) => m.ParametresModule
          ),
      },
      {
        path: "administration",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./administration/administration.module").then(
            (m) => m.AdministrationModule
          ),
      },
    ],
  },
  {
    path: "authentication",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
