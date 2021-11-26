export interface IListItem {
    itemName: string,
    iconName?: string,
    url: string,
}

export interface IList {
    title?: string,
    child: IListItem[]

}

export default interface IListMenu extends Array<IList> {}
