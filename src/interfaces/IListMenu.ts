export interface IListItem {
    itemName: string,
    iconName?: string,
    hasTitle?:boolean,
    url?: string,
}

export interface IList {
    title?: string,
    child: IListItem[]

}

export default interface IListMenu extends Array<IList> {}
