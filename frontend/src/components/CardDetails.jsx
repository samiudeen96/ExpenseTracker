import React, { useContext } from 'react'
import { GoPlus } from "react-icons/go";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";
import { GoDash } from "react-icons/go";
import { ExpContext } from '../context/ExpContext';
import moment from "moment"

const CardDetails = ({ item, openInfoModal }) => {

    const { path } = useContext(ExpContext)

    const roundedNumber = (item) => {
        return Number(item.amount).toFixed(0)
    }

    const trendBg = (item) => {
        return item.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
    }

    // const extractedDate = (item) => {
    //     const date = new Date(item.date);

    //     if (isNaN(date)) {
    //         console.error("Invalid date:", item.date);
    //         return null;
    //     }

    //     // Get local date parts
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const day = String(date.getDate()).padStart(2, '0');

    //     return `${year}-${month}-${day}`;
    // };



    return (
        <div className='flex items-center justify-between flex-wrap group'>
            <div className='flex flex-wrap gap-3 items-center'>
                <div className='bg-background h-10 w-10 flex items-center justify-center rounded-full'>

                    {item.image ? <img className='w-5 h-5' src={item.image} alt={item.image} /> : <CiImageOn className='w-5 h-5' />}
                </div>
                <div>
                    <p className='text-sm'>{item.resource}</p>
                    {/* <p className='text-xs text_primary'>{extractedDate(item)}</p> */}
                    <p className='text-xs text_primary'>{moment(item.date).format("Do MMM YYYY")}</p>

                </div>
            </div>
            <div className='flex gap-5'>
                <div className={`${trendBg(item)}  px-2 py-1 flex items-center gap-1 rounded-md`}>
                    {item.type === 'income' ? <GoPlus className='text-[13px]' /> : <GoDash className='text-[10px]' />}
                    <span className='text-[10px]'>{roundedNumber(item)}</span>
                    {item.type === 'income' ? <FaArrowTrendUp className='text-[10px]' /> : <FaArrowTrendDown className='text-[10px]' />}
                </div>

                {
                    path.pathname!== "/dashboard/home" && (
                        <button
                            className='hidden group-hover:block'
                            onClick={() => openInfoModal(item.id)}
                        >
                            <RiDeleteBin6Line className='text-red-500' />
                        </button>
                    )
                }




            </div>
        </div>
    )
}

export default CardDetails