import { compactTypesEnum } from '../types/types'

export const toggleCompactType = ({
    setCompactType,
    compactType,
}: {
    setCompactType: any
    compactType: compactTypesEnum | null
}) => {
    // перенести в хендлер файл
    const newCompactType =
        compactType === compactTypesEnum.horizontal
            ? compactTypesEnum.vertical
            : compactType === compactTypesEnum.vertical
            ? null
            : compactTypesEnum.horizontal
    setCompactType(newCompactType)
    localStorage.setItem('compactType', JSON.stringify(newCompactType))
}
