import GridLayoutStore from '../store/GridLayoutStore'

const checkLocalStorage = () => {
    const { setLayouts, setCompactType, setToolbox, currentBreakpoint } =
        GridLayoutStore

    const savedCompactType = localStorage.getItem('compactType')
    if (savedCompactType) {
        setCompactType(JSON.parse(savedCompactType))
    }

    const savedLayout = localStorage.getItem('layouts')
    if (savedLayout) {
        const parsedLayout = JSON.parse(savedLayout)
        // console.log(parsedLayout, currentBreakpoint)

        setLayouts(parsedLayout)
    }

    const savedToolbox = localStorage.getItem('toolbox')
    if (savedToolbox) {
        setToolbox(JSON.parse(savedToolbox))
    }
}

export default checkLocalStorage
