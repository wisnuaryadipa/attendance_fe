
import MainBar from '@containers/mainbar';
import Master from '@pages/master/index';
import MasterEmployee from '@pages/master/employee/index'
import MasterDivision from '@pages/master/division/index'
import Attendance from '@pages/attendance/index'
import AddEmployee from '@pages/master/employee/addNew'
import IRoute, {IRoutes} from '@interfaces/IRoute';

const masterRoutes: IRoutes = [
    {
        path: "/",
        pageComponent: Attendance.MainAttendance
    },
    {
        path: "/upload",
        pageComponent: Attendance.UploadAttendance
    },
]

export default masterRoutes;