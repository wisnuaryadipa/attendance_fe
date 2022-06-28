
export interface IAttendance {
    id: number;
    employeeId: number;
    machineId?: number;
    status: string;
    recordTime: string;
    createdAt?: Date;
    updatedAt?: Date;
}