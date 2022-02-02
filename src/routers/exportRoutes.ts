

import IRoute, {IRoutes} from '@interfaces/IRoute';
import ExportPage from '@pages/ExportPage'

const exportRoutes: IRoutes = [
    {
        path: "/reformat-time",
        pageComponent: ExportPage.ReformatTime
    },
]

export default exportRoutes;