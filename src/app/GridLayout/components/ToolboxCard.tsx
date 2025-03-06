import { observer } from 'mobx-react'
import { ICard } from '../types/types'
import RightArrowIcon from '../assets/RightArrowIcon.svg'
import DraggableIcon from '../assets/DraggableIcon.svg'
import Image from 'next/image'
import GridLayoutStore from '../store/GridLayoutStore'
import CrossIcon from '../assets/CrossIcon.svg'

const ToolboxCard = ({ card }: { card: ICard }) => {
    const { addCardToLayoutFromToolbox, removeCardFromToolbox } =
        GridLayoutStore
    return (
        <div
            unselectable='on'
            className='droppable-element flex items-center justify-between outline outline-1 w-full outline-indigo-400 p-2 rounded-sm  bg-white hover:shadow-md transition-all duration-200'
            key={card.i}
        >
            <Image
                onClick={() => removeCardFromToolbox(card)}
                className='cursor-pointer transition-all duration-200 hover:scale-125'
                src={CrossIcon}
                width={20}
                height={20}
                alt='lock'
            />
            <div className='select-none'>{card.i}</div>
            <div className='flex items-center gap-2'>
                <Image
                    onDragStart={(e) => {
                        e.dataTransfer.setData(
                            'card-to-drop',
                            JSON.stringify(card)
                        )
                    }}
                    className='cursor-grab transition-all duration-200 hover:scale-125'
                    src={DraggableIcon}
                    width={20}
                    height={20}
                    alt='lock'
                />
                <Image
                    className='cursor-pointer transition-all duration-200 hover:scale-125'
                    onClick={() => addCardToLayoutFromToolbox(card)}
                    src={RightArrowIcon}
                    width={20}
                    height={20}
                    alt='lock'
                />
            </div>
        </div>
    )
}
export default observer(ToolboxCard)
