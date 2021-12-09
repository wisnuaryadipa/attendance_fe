
import MainBar from '@containers/mainbar';
import Master from '@pages/master/index';
import MasterEmployee from '@pages/master/employee/index';
import MasterDivision from '@pages/master/division/index';
import MasterPosition from '@pages/master/position/index';
import Attendance from '@pages/attendance/index';
import AddEmployee from '@pages/master/employee/addNew'
import IRoute, {IRoutes} from '@interfaces/IRoute';

const masterRoutes: IRoutes = [
    {
        path: "/",
        pageComponent: Attendance.MainAttendance
    },
    {
        path: "/attendance/upload",
        pageComponent: Attendance.UploadAttendance
    },
    {
        path: "/employee",
        pageComponent: MasterEmployee.Main
    },
    {
        path: "/employee/create",
        pageComponent: MasterEmployee.AddNew
    },
    {
        path: "/employee/:employeeId",
        pageComponent: MainBar
    },
    {
        path: "/employee/:employeeId/edit",
        pageComponent: MasterEmployee.Edit
    },
    {
        path: "/employee/:employeeId/detail",
        pageComponent: MainBar
    },
    {
        path: "/division",
        pageComponent: MasterDivision.Main
    },
    {
        path: "/division/create",
        pageComponent: MasterDivision.AddNew
    },
    {
        path: "/division/:divisionId",
        pageComponent: MainBar
    },
    {
        path: "/division/:divisionId/edit",
        pageComponent: MasterDivision.Edit
    },
    {
        path: "/division/:divisionId/detail",
        pageComponent: MainBar
    },
    {
        path: "/position",
        pageComponent: MasterPosition.Main
    },
    {
        path: "/position/create",
        pageComponent: MasterPosition.AddNew
    },
    {
        path: "/position/:positionId",
        pageComponent: MainBar
    },
    {
        path: "/position/:positionId/edit",
        pageComponent: MasterPosition.Edit
    },
    {
        path: "/position/:positionId/detail",
        pageComponent: MainBar
    },
    
    
]

export default masterRoutes;