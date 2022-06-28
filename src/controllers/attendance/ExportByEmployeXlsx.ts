import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import moment from "moment";
import _, { filter } from 'lodash';
import { IAttendance } from "src/interfaces/IAttendance";

export interface IOptions {
    employeeId: string,
    dateStart: string,
    dateEnd: string,
}

interface IReformAttendance {
    nomor: number,
    employeeId: string,
    date: string,
    checkIn?: string,
    checkOut?: string,
    workDutation?: string,
    description?: string
}

let dateStart = moment().startOf('month').startOf('days').format('DD-MM-YYYY');
let dateEnd = moment().format('DD-MM-YYYY');

const exportByEmployeeXlsx = async (options: IOptions) => {
    console.log(options)

    dateStart = options.dateStart;
    dateEnd = options.dateEnd;
    let _resData: AxiosResponse
    const _axiosOption: AxiosRequestConfig = {
        method: 'get',
        url: `${process.env.REACT_APP_URL_API}/api/attendance/list/${options.employeeId}`,
        params: {
            startDate: options.dateStart,
            endDate: options.dateEnd
        }
    }
    
    _resData = await axios(_axiosOption);

    console.log(_resData)
    return reformatResponseJson(_resData.data.data, options.employeeId, dateStart, dateEnd);
}

const reformatResponseJson = (attendances: IAttendance[], employeeId: string, start: string, end: string) => {
    const reformedAttendances: IReformAttendance[]= [];

    const _startDate = moment(start,'DD-MM-YYYY');
    const _totalDate = moment.duration(moment(end,'DD-MM-YYYY').diff(moment(start,'DD-MM-YYYY'))).asDays();
    for (let i = 0; i <= _totalDate; i++) {
        const _defineDate = moment(start,'DD-MM-YYYY').add(i,'d');
        console.log(_defineDate.format('DD/MM/YYYY'))
        const filtered = _.filter(attendances, (att) => {
            return moment(att.recordTime).date() === _defineDate.date();
        });
        const reformatedAttendance: IReformAttendance = {
            nomor: i + 1,
            date: _defineDate.format('DD/MM/YYYY'),
            employeeId: employeeId,
        }

        if (filtered.length > 0) {
            
            const checkIn = (_.filter(filtered, (x) => {return x.status === "CHECKIN"}));
            const checkOut = (_.filter(filtered, (x) => {return x.status === "CHECKOUT"}));
            const _timeCheckIn = checkIn.length > 0 ? checkIn[0].recordTime : undefined;
            const _timeCheckOut = checkOut.length > 0 ? checkOut[0].recordTime : undefined;

            reformatedAttendance.checkIn = _timeCheckIn ? moment(_timeCheckIn).format('DD-MM-YYYY HH:mm') : undefined;
            reformatedAttendance.checkOut = _timeCheckOut ? moment(_timeCheckOut).format('DD-MM-YYYY HH:mm') : undefined;
            reformatedAttendance.workDutation = (_timeCheckIn && _timeCheckOut) 
                ? ( moment(_timeCheckOut).diff(moment(_timeCheckIn), 'hours') + " Jam, " 
                    + moment.duration(moment(_timeCheckOut).diff(moment(_timeCheckIn))).asMinutes() % 60 + " Menit")
                : "";
            reformatedAttendance.description = declareDescription(_timeCheckIn, _timeCheckOut);
        }

        reformedAttendances.push(reformatedAttendance);
    }
    console.log(reformedAttendances)
    return reformedAttendances;

}

const declareDescription = (checkIn:string | undefined, checkOut:string|undefined) => {
    if (checkIn || checkOut) {
        if (!checkIn) {
            return "Pegawai tidak melakukan CHECK IN";
        } else if (!checkOut) {
            return "Pegawai tidak melakukan CHECK OUT";
        } else {
            return ""
        }
    } else {
        return "Pegawai tidak melakukan CHECK IN dan CHECK OUT";
    }
} 

export default exportByEmployeeXlsx