
import MainBar from '@containers/mainbar';
import Master from '@pages/master/index';
import MasterEmployee from '@pages/master/employee/index'
import AddEmployee from '@pages/master/employee/addNew'
import MasterDivision from '@pages/master/division'
import IRoute, {IRoutes} from '@interfaces/IRoute';

const masterRoutes: IRoutes = [
    {
        path: "/",
        pageComponent: Master
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
        pageComponent: MasterDivision
    },
    {
        path: "/division/create",
        pageComponent: MainBar
    },
    {
        path: "/division/:employeeId",
        pageComponent: MainBar
    },
    {
        path: "/division/:employeeId/edit",
        pageComponent: MainBar
    },
    {
        path: "/division/:employeeId/detail",
        pageComponent: MainBar
    },
]

export default masterRoutes;