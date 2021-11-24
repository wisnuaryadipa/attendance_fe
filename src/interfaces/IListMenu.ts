interface IListItem {
    itemName: string,
    iconName?: string,
    url?: string,
}

interface IList {
    title?: string,
    child: IListItem[]

}

export default interface IListMenu extends Array<IList> {}
