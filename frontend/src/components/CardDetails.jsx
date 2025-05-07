import React, { useContext, useState } from 'react'
import { useSwipeable } from 'react-swipeable';
import { GoPlus, GoDash } from "react-icons/go";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";
import { ExpContext } from '../context/ExpContext';
import moment from "moment"

const CardDetails = ({ item, openInfoModal }) => {
    const { path } = useContext(ExpContext);
    const [showDelete, setShowDelete] = useState(false);

    const roundedNumber = (item) => Number(item.amount).toFixed(0);

    const trendBg = (item) =>
        item.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600";

    const handlers = useSwipeable({
        onSwipedLeft: () => setShowDelete(true),
        onSwipedRight: () => setShowDelete(false),
        preventDefaultTouchmoveEvent: true,
        trackTouch: true,
        trackMouse: false,
    });

    return (
        <div
            {...handlers}
            className={`relative flex items-center justify-between flex-wrap transition-all duration-300 px-2 py-2 rounded-md group
                        ${showDelete ? 'bg-red-50' : ''}`}
        >
            <div className='flex flex-wrap gap-3 items-center'>
                <div className='bg-background h-10 w-10 flex items-center justify-center rounded-full'>
                    {item.image ? (
                        <img className='w-5 h-5' src={item.image} alt={item.image} />
                    ) : (
                        <CiImageOn className='w-5 h-5' />
                    )}
                </div>

                <div>
                    <p className='text-sm'>{item.resource}</p>
                    <p className='text-xs text_primary'>
                        {moment(item.date).format("Do MMM YYYY")}
                    </p>
                </div>
            </div>

            <div className='flex gap-5'>
                <div className={`${trendBg(item)} px-2 py-1 flex items-center gap-1 rounded-md`}>
                    {item.type === 'income' ? (
                        <GoPlus className='text-[13px]' />
                    ) : (
                        <GoDash className='text-[10px]' />
                    )}
                    <span className='text-[10px]'>{roundedNumber(item)}</span>
                    {item.type === 'income' ? (
                        <FaArrowTrendUp className='text-[10px]' />
                    ) : (
                        <FaArrowTrendDown className='text-[10px]' />
                    )}
                </div>

                {/* Mobile/Tablet Swipe Delete */}
                {showDelete && path.pathname !== "/dashboard/home" && (
                    <button
                        className='block sm:hidden'
                        onClick={() => openInfoModal(item.id)}
                    >
                        <RiDeleteBin6Line className='text-red-500' />
                    </button>
                )}

                {/* Desktop Hover Delete */}
                {path.pathname !== "/dashboard/home" && (
                    <button
                        className='hidden sm:block group-hover:block'
                        onClick={() => openInfoModal(item.id)}
                    >
                        <RiDeleteBin6Line className='text-red-500' />
                    </button>
                )}
            </div>
        </div>
    )
}

export default CardDetails;
