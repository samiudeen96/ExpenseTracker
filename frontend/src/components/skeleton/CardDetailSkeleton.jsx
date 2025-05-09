import React from 'react'

const CardDetailSkeleton = () => {
    return (
        <div className='flex  justify-between items-center px-2 py-1'>
            <div className='flex flex-wrap gap-3 items-center animate-pulse'>
                <div className='bg-gray-300 h-10 w-10 flex items-center justify-center rounded-full'></div>

                <div className='flex flex-col gap-2'>
                    <div className='h-4 bg-gray-300 rounded w-24'></div>
                    <div className='h-3 bg-gray-300 rounded w-20'></div>
                </div>
            </div>

            <div className='bg-gray-300 h-5 w-22 rounded-md' />
        </div>
    )
}

export default CardDetailSkeleton;