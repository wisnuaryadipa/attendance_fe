import IRoute, {IRoutes} from '@interfaces/IRoute';

import Payroll from '@pages/payroll/index'

const masterRoutes: IRoutes = [

    {
        path: "/",
        pageComponent: Payroll.main
    },
    {
        path: "/:employeeId/form",
        pageComponent: Payroll.input
    },
]

export default masterRoutes;