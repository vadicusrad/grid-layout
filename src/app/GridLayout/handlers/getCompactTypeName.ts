import { compactTypesEnum } from '../types/types'

export const getCompactTypeName = (compactType: compactTypesEnum | null) => {
    switch (compactType) {
        case compactTypesEnum.vertical:
            return 'Вертикальная'
        case compactTypesEnum.horizontal:
            return 'Горизонтальная'
        default:
            return 'Отключена'
    }
}
