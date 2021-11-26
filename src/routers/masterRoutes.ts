
import MainBar from '@containers/mainbar';
import Master from '@pages/master/index';
import IRoute, {IRoutes} from '@interfaces/IRoute';

const masterRoutes: IRoutes = [
    {
        path: "/",
        pageComponent: Master
    },
    {
        path: "/employee",
        pageComponent: Master
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
        pageComponent: Master
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