import { ReglementDocument } from "./reglementDocument";

export class Reglement
 {
    regId?: number;
    regReference?: string;
    regDate?: string;
    regMontant?: number;
    regCommission?: number;
    typeReglement?: string;
    affCode?: string;
    affId?:number;
    affAssure?: string;
    affActivite?: string;
    affDateEffet?: string;
    affDateEcheance?: string;
    cedNomFiliale?: string;
    cedSigleFiliale?: string;
    userId?:number;
    regMode?:string;
    regRecu?:string;
    regDocReqs? : ReglementDocument[]
}