import {FC} from 'react';


export default interface IRoute {
    path: string,
    pageComponent: JSX.Element | FC
}

export interface IRoutes extends Array<IRoute> {}