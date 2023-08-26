import { Injectable } from "@angular/core";
import { UserToken } from "../models/userToken";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "../models/user";
import { RestClientService } from "./rest-client.service";
import { Observable } from "rxjs";
import * as _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class UserService {
  keySessionStorageUser: string = "accesToken";
  constructor(
    private jwtHelper: JwtHelperService,
    private restClient: RestClientService
  ) {}

  setAuthToken(dataToken: UserToken) {
    if (dataToken) {
      sessionStorage.setItem(
        this.keySessionStorageUser,
        JSON.stringify(dataToken)
      );
    }
  }

  getCurrentToken() {
    let userToken: UserToken;
    if (sessionStorage.getItem(this.keySessionStorageUser)) {
      // Ici njous recuperons les informations de l'utilisateur
      // Apres ne pas oublier de crypter
      userToken = JSON.parse(
        sessionStorage.getItem(this.keySessionStorageUser)
      );
    }

    return userToken;
  }

  getCurrentUserInfo() {
    let decode_data: any;

    if (this.getCurrentToken().accessToken) {
      decode_data = this.jwtHelper.decodeToken(
        this.getCurrentToken().accessToken
      ) as any;

      if (decode_data.authorities) {
        let hasAcces = _.find(decode_data.authorities, (o) => {
          return o.trim().toUpperCase() == "VAL-PLA";
        });
        if (hasAcces) {
          decode_data.isActeurValideur = true;
        } else {
          decode_data.isActeurValideur = false;
        }
      }
    }

    return decode_data;
  }

  removeCurrentUser() {
    sessionStorage.removeItem(this.keySessionStorageUser);
  }

  /** Appel d'API */
  create = (body: any, option?: any): Observable<any> => {
    return this.restClient.post("users/create", body, option);
  };

  createUserWithFonction = (body: any, option?: any): Observable<any> => {
    return this.restClient.post("users/create-user-and-function", body, option);
  };

  getAll = () => {
    return this.restClient.get("users/list");
  };

  getByCriteria = (index: number = 0, size: number = 10, key?: string) => {
    let endPointFinal =
      "users/list?page=" +
      index +
      "&size=" +
      size +
      "" +
      (key ? "&key=" + key : "");
    return this.restClient.get(endPointFinal);
  };

  getInfoUser = (idUser: number) => {
    return this.restClient.get("users/infos/" + idUser);
  };

  update = (body: any) => {
    return this.restClient.put("users/update", body);
  };


  changePassword = (body: any) => {
    return this.restClient.put("users/change-password", body);
  };

  unLockAccount = (idUser: any) => {
    return this.restClient.put("users/unblock/" + idUser, {});
  };

  lockAccount = (idUser: any) => {
    return this.restClient.put("users/block/" + idUser, {});
  };

  activateAccount = (body: any, option?: any): Observable<any> => {
    return this.restClient.put("users/open/activate-account", body, option);
  };

  sendEmailForReinitPassword = (email: any, option?: any): Observable<any> => {
    return this.restClient.put(
      "users/open/send-reinit-password-email/" + email,
      {}
    );
  };


  sendActivationEmail = (email: any, option?: any): Observable<any> => {
    return this.restClient.put(
      "users/open/send-acitivation-email/" + email,
      {}
    );
  };

  reinitPassword = (body: any, option?: any): Observable<any> => {
    return this.restClient.put("users/open/reinit-password", body, option);
  };
}
