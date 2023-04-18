import { Injectable } from '@angular/core';
import { UserToken } from '../models/userToken';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  keySessionStorageUser: string = 'accesToken';
  constructor() { }

  setAuthToken(dataToken:UserToken) {
    if(dataToken) {
      sessionStorage.setItem(this.keySessionStorageUser,JSON.stringify(dataToken));
    }
  } 
 
  getCurrentToken(){
    let userToken:UserToken;
    if(sessionStorage.getItem(this.keySessionStorageUser)) {
      // Ici njous recuperons les informations de l'utilisateur
      // Apres ne pas oublier de crypter
      userToken = JSON.parse(sessionStorage.getItem(this.keySessionStorageUser));
    }

    return userToken;
  }

  removeCurrentUser() {
    sessionStorage.removeItem(this.keySessionStorageUser);
  }
}
