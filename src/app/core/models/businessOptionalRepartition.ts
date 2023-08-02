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


