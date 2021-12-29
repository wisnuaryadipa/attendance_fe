import react, {FC} from 'react';
import styled from 'styled-components';
import {IListItem} from '@src/interfaces/IListMenu';
import loadable from '@loadable/component';
import {NavLink, Link, useLocation} from 'react-router-dom';


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
    color:black;
    
    &.active {
        background: linear-gradient(118deg,#7367f0,rgba(115,103,240,.7));
        box-shadow: 0 0 10px 1px rgb(115 103 240 / 70%);
        border-radius: 4px;
        color: #fff;
    }

    :hover  {
       background-color: rgb(240, 240, 255)
    }

`

const ListChild = (props: Props) => {
    const location = useLocation();
    const {itemName, iconName, url} = props;
    
    console.log(location.pathname)
    console.log(url)
    let render = (
        <ListItem>{itemName}</ListItem>
    )

    if (iconName) {
        const IconDynamic = loadable(() => import (`@components/font/${iconName}`));

        render = (
            <NavLink to={url} >
                <ListItem className={`${location.pathname === url ? 'active' : ""}`}>
                    <IconDynamic />{itemName}
                </ListItem>
            </NavLink>
        )
    }

    return render;
}

ListChild.defaultProps = defaultProps;

export default ListChild;