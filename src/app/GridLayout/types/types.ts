export interface ILayout {
    [index: string]: ICard[]
}

export interface ICard {
    x: number
    y: number
    w: number
    h: number
    i: string
    static: boolean
    resizeHandles: resizeHandlesEnum[]
    minW?: number
    minH?: number
    maxW?: number
    maxH?: number
    isDraggable?: boolean
}

export enum resizeHandlesEnum {
    s = 's',
    w = 'w',
    e = 'e',
    n = 'n',
    sw = 'sw',
    nw = 'nw',
    se = 'se',
    ne = 'ne',
}

export enum compactTypesEnum {
    vertical = 'vertical',
    horizontal = 'horizontal',
}
