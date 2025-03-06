import { observer } from 'mobx-react'

import { getCompactTypeName } from '../handlers/getCompactTypeName'

import GridLayoutStore from '../store/GridLayoutStore'

const ButtonsPanel = () => {
    const {
        setLayouts,
        layouts,
        compactType,
        setCompactType,
        setToolbox,
        addCardToLayout,
        toggleCompactType,
        currentBreakpoint,
    } = GridLayoutStore
    return (
        <div className='h-[6vh] py-2 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <button
                    onClick={addCardToLayout}
                    className='px-2 h-8 bg-indigo-500 text-white hover:bg-indigo-600 active:bg-indigo-700 rounded'
                >
                    Добавить карточку
                </button>
                <button
                    onClick={toggleCompactType}
                    className='px-2 h-8 bg-indigo-500 text-white hover:bg-indigo-600 active:bg-indigo-700 rounded'
                >
                    Сменить тип компановки
                </button>
                <span>Компановка - {getCompactTypeName(compactType)}</span>
            </div>
            <button
                onClick={() => {
                    setLayouts({
                        [currentBreakpoint]: [],
                    })
                    setCompactType(null)
                    setToolbox([])
                    localStorage.clear()
                }}
                className='px-4 h-8 text-indigo-500 rounded'
            >
                Очистить
            </button>
        </div>
    )
}

export default observer(ButtonsPanel)
