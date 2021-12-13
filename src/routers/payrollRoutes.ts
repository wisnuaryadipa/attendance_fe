import IRoute, {IRoutes} from '@interfaces/IRoute';

import Payroll from '@pages/payroll/index'

const masterRoutes: IRoutes = [
    {
        path: "/:employeeId/form",
        pageComponent: Payroll.MainPayroll
    },
]

export default masterRoutes;