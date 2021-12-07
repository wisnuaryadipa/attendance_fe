import IPosition from "./IPosition";

export interface IBaseDivision {
    name: string,
    status: number,
    createdAt: Date,
    updatedAt: Date
}

interface IDivision extends IBaseDivision {
    id: number,
    positions?: IPosition[]
}

export default IDivision;