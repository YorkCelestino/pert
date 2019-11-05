export interface IActivitys {
    name: string;
    dependecy: any[];
    costo: number;
}

export interface IActivity  extends Array<IActivitys> {
    name: string;
    dependecy: any[];
    costo: number;
}
