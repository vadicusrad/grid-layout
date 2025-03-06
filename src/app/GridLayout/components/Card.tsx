import Image from 'next/image'
import LockIcon from '../assets/LockIcon.svg'
import UnlockIcon from '../assets/UnlockIcon.svg'
import CrossIcon from '../assets/CrossIcon.svg'
import GridLayoutStore from '../store/GridLayoutStore'
import { ICard } from '../types/types'
import { observer } from 'mobx-react'

interface CardProps {
    card: ICard
}

const Card = ({ card }: CardProps) => {
    const { removeCardFromLayout, toggleCardStatic } = GridLayoutStore

    return (
        <div
            className={
                'bg-white p-4 pt-10  relative shadow-md outline outline-1 outline-indigo-400 rounded h-full select-none overflow-hidden'
            }
        >
            <button
                onMouseDown={(e) => e.stopPropagation()}
                className='absolute top-2 left-2 p-1'
                onClick={(e) => {
                    toggleCardStatic(card.i)
                    e.stopPropagation()
                }}
            >
                {card.static ? (
                    <Image src={LockIcon} width={20} height={20} alt='lock' />
                ) : (
                    <Image
                        src={UnlockIcon}
                        width={20}
                        height={20}
                        alt='unlock'
                    />
                )}
            </button>
            {card.static ? null : (
                <button
                    onMouseDown={(e) => e.stopPropagation()}
                    className='absolute top-1 right-2 p-1'
                    onClick={(e) => {
                        e.stopPropagation()
                        removeCardFromLayout(card)
                    }}
                >
                    <Image src={CrossIcon} width={20} height={20} alt='cross' />
                </button>
            )}
            {card.i}
        </div>
    )
}

export default observer(Card)
