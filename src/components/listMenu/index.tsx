import react, {FC, lazy, Suspense } from 'react';
import styled from 'styled-components';
import IListMenu from '@src/interfaces/IListMenu';
import loadable from '@loadable/component';


interface Props extends react.RefAttributes<any> {
    data: IListMenu
}

const ListWrapper = styled.div`
    margin-bottom: 10px;
`

const ListTitle = styled.h3`
    font-size: 13px;
    color: #a3a3a3;
`

const List = styled.ul`
    list-style: none;
    padding: 5px;
`

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

const ListMenu: FC<Props> = styled((props: Props) => {
    const data: IListMenu = props.data;

    const render = (
        <ListWrapper {...props}>
            { data.map((item) => (
                <>
                    {item.title ? <ListTitle>{item.title}</ListTitle> : ""}
                    
                    <List>
                        {item.child.map((listItem) => {

                            let render = (
                                    <ListItem>{listItem.itemName}</ListItem>
                            )

                            if (listItem.iconName) {
                                const IconDynamic = loadable(() => import (`@components/font/${listItem.iconName}`));

                                render = (
                                    <ListItem>
                                        <IconDynamic />{listItem.itemName}
                                    </ListItem>
                                )
                            }

                            return render;
                        })}
                    </List>
                </>
            )) }
            
        </ListWrapper>
    )

    return render;
})`
    
`

export default ListMenu;