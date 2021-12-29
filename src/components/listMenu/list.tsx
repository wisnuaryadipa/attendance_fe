import react, {FC} from 'react';
import styled from 'styled-components';
import {IList} from '@src/interfaces/IListMenu';
import ListItem from './listItem';
import {useLocation} from 'react-router-dom';



interface Props extends react.RefAttributes<any> {
    data: IList
}

const List = styled.ul`
    list-style: none;
    padding: 5px;
    
    a {
            
        text-decoration: none !important;
    }
`
const ListTitle = styled.h3`
    font-size: 13px;
    color: #a3a3a3;
`

const ListChild: FC<Props> = styled((props: Props) => {



    const item = props.data;

    let render = (
        <List>
            {item.child.map((listItem) => (
                <ListItem 
                url={listItem.url}
                hasTitle={false}
                itemName={listItem.itemName} 
                iconName={listItem.iconName}/>
            ))}
        </List>
    )

    if (item.title) {
        render = (
            <>
                <ListTitle>{item.title}</ListTitle>
                <List>
                    {item.child.map((listItem) => (
                        <ListItem 
                        url={listItem.url}
                        itemName={listItem.itemName} 
                        iconName={listItem.iconName}/>
                    ))}
                </List>
            </>
        )
    }

    return render;
})`

`

export default ListChild;