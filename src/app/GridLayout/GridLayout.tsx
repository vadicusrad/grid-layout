'use client'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { FC, useEffect } from 'react'
import _ from 'lodash'
import Card from './components/Card'
import ButtonsPanel from './components/ButtonsPanel'
import checkLocalStorage from './handlers/checkLocalStorage'
import GridLayoutStore from './store/GridLayoutStore'
import { observer } from 'mobx-react'
import Toolbox from './components/Toolbox'

const ResponsiveReactGridLayout = WidthProvider(Responsive)
const GridLayout: FC = () => {
    const {
        layouts,
        compactType,
        currentBreakpoint,
        onBreakpointChange,
        onLayoutChange,
        onDrop,
        mounted,
        setMounted,
    } = GridLayoutStore

    useEffect(() => {
        checkLocalStorage()
        setMounted(true)
    }, [])

    const generateDOM = () => {
        return (
            layouts[currentBreakpoint] &&
            layouts[currentBreakpoint].map((card) => {
                return (
                    <div key={card.i}>
                        <Card card={card} />
                    </div>
                )
            })
        )
    }

    return (
        <div className='px-8'>
            <ButtonsPanel />
            <div className='flex gap-4'>
                <Toolbox />
                <ResponsiveReactGridLayout
                    // {...props}
                    cols={{ lg: 12, md: 8, sm: 4, xs: 2, xxs: 1 }}
                    breakpoints={{
                        lg: 1200,
                        md: 996,
                        sm: 768,
                        xs: 480,
                        xxs: 0,
                    }}
                    containerPadding={[20, 20]}
                    className='w-full bg-gray-300 min-h-[92vh] max-h-[92vh] overflow-auto relative'
                    layouts={layouts}
                    measureBeforeMount={false}
                    useCSSTransforms={mounted}
                    compactType={compactType}
                    preventCollision={!compactType}
                    onLayoutChange={onLayoutChange}
                    onBreakpointChange={onBreakpointChange}
                    onDrop={onDrop}
                    isDroppable={true}
                    rowHeight={50}
                    allowOverlap={false} // возможность наложения карточек
                >
                    {generateDOM()}
                </ResponsiveReactGridLayout>
            </div>
        </div>
    )
}

export default observer(GridLayout)
