import react, {FC} from 'react';
import styled from 'styled-components';
import {IListItem} from '@src/interfaces/IListMenu';
import loadable from '@loadable/component';


interface Props extends react.RefAttributes<any>, IListItem {}

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

const ListChild: FC<Props> = styled(({ hasTitle=false, ...props}: Props) => {

    const {itemName, iconName} = props;
    
    let render = (
        <ListItem>{itemName}</ListItem>
    )

    if (iconName) {
        const IconDynamic = loadable(() => import (`@components/font/${iconName}`));

        render = (
            <ListItem>
                <IconDynamic />{itemName}
            </ListItem>
        )
    }

    return render;
})`

`

ListChild.defaultProps = {
    hasTitle: false
}

export default ListChild;