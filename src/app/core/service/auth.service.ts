import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "src/environments/environment";
import * as _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public setCurrentUser() {
    // Je viens de setter
    this.currentUserSubject.next(
      JSON.parse(localStorage.getItem("currentUser"))
    );
  }

  login(username: string, password: string) {
    let request = {
      username: username,
      password: password,
    };

    const optionRequete = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
      }),
    };

    return this.http
      .post<any>(
        `${environment.apiUrl}users/open/login`,
        request,
        optionRequete
      )
      .pipe(
        map((user: any) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // if(user && user.items && user.items.length){

          //   // Faire remonter serviceId
          //   if(user?.items && user?.items?.length > 0) {
          //     let currentUniteFonctionnelle = _.find(user.items[0]?.uniteFonctionnelles , (o) => { return o.idUniteFonctionnelle == user.items[0]?.uniteFoncActiveId });
          //     user.items[0].currentFonctionnaliteSelected = currentUniteFonctionnelle;
          //   }

          //   localStorage.setItem('currentUser', JSON.stringify(user.items[0]));
          //   this.currentUserSubject.next(user);
          // }

          let userMock: User = {
            nom: "ADOU",
            prenom: "VENANCE",
            id: 1,
            img: "",
            username: username,
            password: "",
            firstName: "ADOU",
            lastName: "VENANCE",
            token: "xxxx",
          };

          this.currentUserSubject.next(userMock);

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}
