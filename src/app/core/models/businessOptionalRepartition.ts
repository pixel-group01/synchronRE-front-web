import { CessionLegale } from "./cessionLegale";

export class BusinessOptionalRepartition {
    repId?: number;
    repCapital?: number;
    repTaux?: number;
    repTauxBesoinFac?: number;
    repSousCommission?: number;
    repInterlocuteur?: string;
    affId?: number;
    cesId?: number;
    paramCesLegalId?: number;
    typId?: number;
    besoinFacInitial?:number
}

export class CalculateRelartitionRequest {
    affId?: number;
    repCapital?: number;
    repTaux?: number;
    repId?: number;
    pclIds?: any = [];
    repIdToBeModified?: number;
}

export class CalculateRelartitionResponse {
    affId?: number;
    besoinFac?: number;
    besoinFacRestant?: number;
    repCapital?: number;
    repId?: any = [];
    paramCesLegs?:any = [];
    repTaux?: number;
}


export class RepartitionTraiteeBesoinFac {
    besoinFac?: number;
    besoinFacNetCL?: number;
    besoinFacNetCLPrime?: number;
    besoinFacNetCLTaux?: number;
    besoinFacRestant?: number;
    bruteBesoinFac?: number;
    bruteBesoinFacPrime?: number;
    bruteBesoinFacTaux?: number;
    capitauxNetCL?: number;
    conservationCapital?: number;
    conservationPrime?: number;
    conservationRepId?: number;
    conservationTaux?: number;
    facobCapital?: number;
    facobPrime?: number;
    facobRepId?: number;
    facobTaux?: number;
    xlCapital?: number;
    xlPrime?: number;
    xlRepId?: number;
    xlTaux?: number;
    paramCesLegs?:CessionLegale[];
    paramCesLegsPremierFranc?:CessionLegale[];
    primePartCedante?: number;
    tauxPartCedante?: number;
    mtPartCedante?: number;
    modeUpdate?:boolean
}


