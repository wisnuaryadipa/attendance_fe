
import MainBar from '@containers/mainbar';
import Master from '@pages/master/index';
import MasterEmployee from '@pages/master/employee'
import MasterDivision from '@pages/master/division'
import IRoute, {IRoutes} from '@interfaces/IRoute';

const masterRoutes: IRoutes = [
    {
        path: "/",
        pageComponent: Master
    },
    {
        path: "/employee",
        pageComponent: MasterEmployee
    },
    {
        path: "/employee/create",
        pageComponent: MainBar
    },
    {
        path: "/employee/:employeeId",
        pageComponent: MainBar
    },
    {
        path: "/employee/:employeeId/edit",
        pageComponent: MainBar
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