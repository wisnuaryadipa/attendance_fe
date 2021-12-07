import IPosition from "./IPosition";
export interface IBaseEmployee {
    name: string;
    role: string;
    division?: number;
    createdAt: Date;
    updatedAt: Date;
    status: number;
    machineId?: number;
    positionId?: number;
    gender?:string;
    employeeStatus?:string;
    hireDate?: Date;
    dateOfBirth?: Date;
    address?:string;
    contactNumber?:string;
    email?:string;
    employeeCode?:string;
    description?:string;
}

export default interface IEmployee extends IBaseEmployee {
    id: number,
    readonly position?: IPosition;
}