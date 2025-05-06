import React, { useContext } from 'react'
import { ExpContext } from '../context/ExpContext'
import { IoIosClose } from "react-icons/io";

const InfoModal = () => {
    const { infoContent, setInfoModal } = useContext(ExpContext);
    return (
        <div className="fixed inset-0 bg-[#00000047] bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white  rounded-md shadow-sm m-3 p-5">
                {/* <div className='flex justify-end p-2'><IoIosClose onClick={() => setInfoModal(false)} className='w-8 h-8 cursor-pointer' /></div> */}
                <div className=''>
                    <p>{infoContent.text}</p>
                    <div className='flex justify-center items-center gap-5 mt-5'>
                        <button className='button_secondary' onClick={() => setInfoModal(false)}>Cancel</button>
                        <button className={`button_tertiary ${infoContent.color}`} onClick={infoContent.handler}>{infoContent.buttonName}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoModal