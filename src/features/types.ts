export type ItemType = {
    id: string,
    content: string,
    groupdIndex?: number,
}

export type ItemGroups = Array<ItemType[]>;