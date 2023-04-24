import { Role } from './role';

export class User {
  id: number;
  img: string;
  photo?: string;
  username: string;
  password: string;
  firstName: string;
  nom?:string;
  prenom?:string;
  lastName: string;
  cedId?:number;
  role?: Role;
  token: string;
  uniteFoncActiveId?:string;
  adminUniteFonctionnelleCode?:string
}
