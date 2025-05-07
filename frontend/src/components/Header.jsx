import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Sidebar from './Sidebar'; 1
import { IoClose } from "react-icons/io5";
import { ExpContext } from '../context/ExpContext';

const Header = () => {
    const { showSidebar, setShowSidebar } = useContext(ExpContext)

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (showSidebar) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup on component unmount
        return () => document.body.classList.remove('overflow-hidden');
    }, [showSidebar]);

    return (
        <>
            <div className='flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-5  shadow-sm'>
                <h2 className='font-medium text-lg text-primary'>Expense Tracker</h2>
                <div className='relative'>

                    {
                        !showSidebar ? <HiOutlineMenuAlt2
                            className='w-7 h-7 cursor-pointer'
                            onClick={() => setShowSidebar(true)}
                        /> : <IoClose className='w-7 h-7 cursor-pointer'
                            onClick={() => setShowSidebar(false)} />
                    }
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}

            
        </>
    );
};

export default Header;
