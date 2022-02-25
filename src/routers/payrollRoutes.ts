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
    {
        path: "/weekly/import",
        pageComponent: Payroll.weeklyImport
    },
]

export default masterRoutes;