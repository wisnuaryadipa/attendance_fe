import react, {FC, lazy, Suspense } from 'react';
import styled from 'styled-components';
import IListMenu from '@src/interfaces/IListMenu';
import loadable from '@loadable/component';
import List from './list';


interface Props extends react.RefAttributes<any> {
    data: IListMenu
}

const ListWrapper = styled.div`
    margin-bottom: 10px;
`

const ListMenu: FC<Props> = styled((props: Props) => {
    const data: IListMenu = props.data;

    const render = (
        <ListWrapper {...props}>
            { 
                data.map((item) => (
                    <List data={item} />
                )) 
            }
            
        </ListWrapper>
    )

    return render;
})`
    
`

export default ListMenu;