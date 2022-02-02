

import IRoute, {IRoutes} from '@interfaces/IRoute';
import ImportPage from '@pages/import'

const importRoute: IRoutes = [
    {
        path: "/master-salary-employee",
        pageComponent: ImportPage.SalaryEmployee
    },
]

export default importRoute;