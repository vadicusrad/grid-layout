import { observer } from 'mobx-react'
import GridLayoutStore from '../store/GridLayoutStore'
import { ICard } from '../types/types'
import ToolboxCard from './ToolboxCard'

const Toolbox = () => {
    const { toolbox } = GridLayoutStore
    return (
        <div className='flex flex-col gap-2 h-[92vh] overflow-y-scroll  w-[300px] bg-gray-100 outline outline-1 outline-indigo-300 p-2'>
            {toolbox.map((card: ICard) => (
                <ToolboxCard key={card.i} card={card} />
            ))}
        </div>
    )
}
export default observer(Toolbox)
