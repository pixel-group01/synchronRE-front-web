import { Injectable } from '@angular/core';
import { UserToken } from '../models/userToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  keySessionStorageUser: string = 'accesToken';
  constructor(
    private jwtHelper: JwtHelperService) { }

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

  getCurrentUserInfo() {
    let decode_data : any;

    if(this.getCurrentToken().accessToken) {
       decode_data = this.jwtHelper.decodeToken(this.getCurrentToken().accessToken) as any
    }
    
    return decode_data;
  }

 


  removeCurrentUser() {
    sessionStorage.removeItem(this.keySessionStorageUser);
  }
}
