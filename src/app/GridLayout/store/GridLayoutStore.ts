import { makeAutoObservable } from 'mobx'
import { compactTypesEnum, ICard, ILayout } from '../types/types'
import { cardTemplate } from '../constants/constants'

class GridLayoutStore {
    constructor() {
        makeAutoObservable(this)
    }
    mounted: boolean = false
    setMounted = (value: boolean) => {
        this.mounted = value
    }

    // start breakpoint block ===========================================================
    currentBreakpoint: string = 'lg'
    setCurrentBreakpoint = (value: string) => {
        this.currentBreakpoint = value
    }
    onBreakpointChange = (breakpoint: string) => {
        const prevLayout = this.layouts[this.currentBreakpoint]
        // const prevToolbox = this.toolbox
        // this.setToolbox({
        //     ...this.toolbox,
        //     [breakpoint]: prevToolbox || [],
        // })
        this.setLayouts({
            ...this.layouts,
            [breakpoint]: prevLayout || [],
        })
        this.setCurrentBreakpoint(breakpoint)
    }
    // end breakpoint block ===========================================================

    //start layout block ==========================================================
    layouts: ILayout = {
        [this.currentBreakpoint]: [],
    }

    setLayouts = (value: ILayout) => {
        this.layouts = value
    }

    addCardToLayout = () => {
        const newCard = Object.assign({}, cardTemplate, {
            i: String(Date.now()),
        })

        // Создаем карточку для всех breakpoint'ов
        const updatedLayouts: ILayout = {
            lg: [...(this.layouts.lg || []), newCard],
            md: [...(this.layouts.md || []), newCard],
            sm: [...(this.layouts.sm || []), newCard],
            xs: [...(this.layouts.xs || []), newCard],
            xxs: [...(this.layouts.xxs || []), newCard],
        }

        this.setLayouts(updatedLayouts)
    }

    removeCardFromLayout = (card: ICard) => {
        this.addCardToToolbox({ ...card })

        const updatedLayouts = this.layouts[this.currentBreakpoint].filter(
            (item: ICard) => item.i !== card.i
        )

        this.setLayouts({
            ...this.layouts,
            [this.currentBreakpoint]: updatedLayouts,
        })

        this.onLayoutChange(updatedLayouts, {
            [this.currentBreakpoint]: updatedLayouts,
        })
    }

    toggleCardStatic = (cardI: string) => {
        const updatedLayouts = this.layouts[this.currentBreakpoint].map(
            (card: ICard) => {
                if (card.i === cardI) {
                    return {
                        ...card,
                        static: !card.static,
                    }
                }
                return card
            }
        )

        this.setLayouts({
            ...this.layouts,
            [this.currentBreakpoint]: updatedLayouts,
        })
    }
    // end layout block =====================================================================

    // start toolbox block ==========================================================
    toolbox: ICard[] = []

    setToolbox = (value: ICard[]) => {
        this.toolbox = value
    }

    addCardToToolbox = (card: ICard) => this.toolbox.push(card)

    removeCardFromToolbox = (card: ICard) => {
        this.toolbox = this.toolbox.filter((item: ICard) => item.i !== card.i)
    }

    addCardToLayoutFromToolbox = (card: ICard) => {
        this.removeCardFromToolbox(card)
        this.addCardToLayout()
    }

    // end toolbox block =====================================================================

    // start compact block ==========================================================
    compactType: compactTypesEnum | null = null

    setCompactType = (value: compactTypesEnum | null) => {
        this.compactType = value
    }

    toggleCompactType = () => {
        const newCompactType =
            this.compactType === compactTypesEnum.horizontal
                ? compactTypesEnum.vertical
                : this.compactType === compactTypesEnum.vertical
                ? null
                : compactTypesEnum.horizontal
        this.setCompactType(newCompactType)
        localStorage.setItem('compactType', JSON.stringify(newCompactType))
    }
    // end compact block =====================================================================

    // start common methods block ==========================================================
    onLayoutChange = (layout: any, layouts: any) => {
        this.setLayouts({
            ...this.layouts,
            [this.currentBreakpoint]: layouts[this.currentBreakpoint].filter(
                (card: ICard) => card.i !== '__dropping-elem__'
            ),
        })
        console.log('onLayoutChange', layouts)

        this.setDataToLocalStorage(layouts)
    }

    setDataToLocalStorage = (layouts: any) => {
        console.log('setDataToLocalStorage', layouts)

        if (layouts[this.currentBreakpoint].length) {
            console.log('YOOOOOOO', this.layouts)

            localStorage.setItem(
                'layouts',
                JSON.stringify({
                    ...this.layouts,
                    [this.currentBreakpoint]: layouts[this.currentBreakpoint],
                })
            )
        }

        this.toolbox &&
            localStorage.setItem('toolbox', JSON.stringify(this.toolbox))
    }

    onDrop = (layout: any, layoutItem: any, _ev: any) => {
        if (!_ev.dataTransfer.getData('card-to-drop')) {
            console.error('Данные карточки не были переданы')
            return
        }

        const droppedCardData = JSON.parse(
            _ev.dataTransfer.getData('card-to-drop')
        )
        const updatedLayouts = [
            ...this.layouts[this.currentBreakpoint],
            { ...droppedCardData },
        ]

        this.setLayouts({
            ...this.layouts,
            [this.currentBreakpoint]: updatedLayouts,
        })

        this.removeCardFromToolbox(droppedCardData)
    }
    // end common methods block =====================================================================
}
export default new GridLayoutStore()
