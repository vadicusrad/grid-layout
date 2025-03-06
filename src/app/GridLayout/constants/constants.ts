import { resizeHandlesEnum } from '../types/types'

export const cardTemplate = {
    x: 0,
    y: 0,
    w: 2,
    h: 4,
    i: '',
    static: false,
    resizeHandles: [
        resizeHandlesEnum.s,
        resizeHandlesEnum.w,
        resizeHandlesEnum.e,
        resizeHandlesEnum.n,
        resizeHandlesEnum.sw,
        resizeHandlesEnum.nw,
        resizeHandlesEnum.se,
        resizeHandlesEnum.ne,
    ],
    minW: 2,
    minH: 3,
    maxW: 12,
    maxH: 13,
}
