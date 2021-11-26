import react, {FC} from 'react';
import styled from 'styled-components';
import {IListItem} from '@src/interfaces/IListMenu';
import loadable from '@loadable/component';
import {NavLink, Link} from 'react-router-dom';


interface Props extends react.RefAttributes<any>, IListItem {
    hasTitle: boolean;
}

const defaultProps = {
    hasTitle: false
}

const ListItem = styled.li`
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;
    

    :hover  {
       background-color: rgb(240, 240, 255)
    }

`

const ListChild = (props: Props) => {

    const {itemName, iconName, url} = props;
    
    let render = (
        <ListItem>{itemName}</ListItem>
    )

    if (iconName) {
        const IconDynamic = loadable(() => import (`@components/font/${iconName}`));

        render = (
            <NavLink to={url} >
                <ListItem>
                    <IconDynamic />{itemName}
                </ListItem>
            </NavLink>
        )
    }

    return render;
}

ListChild.defaultProps = defaultProps;

export default ListChild;