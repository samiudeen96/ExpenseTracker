import React, { useContext } from 'react'
import { ExpContext } from '../context/ExpContext'
import { convertedName, getInitials } from '../utils/helper'


const Avatar = () => {
    const { userDetails, userInfo, userLoading } = useContext(ExpContext)


    if (userLoading || !userInfo) {
        return (
            <div className="flex flex-col items-center pt-5">
                <div className="h-20 w-20 rounded-full bg-background"></div>
                {/* <div className="mt-2 h-[24px] w-24 bg-gray-300 rounded "></div> */}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center pt-5">
            <div className="bg-background h-20 w-20 rounded-full flex items-center justify-center">
                <p className="text-3xl">{getInitials(userInfo.name)}</p>
            </div>
            <p className="mt-2 font-medium">{convertedName(userInfo.name)}</p>
        </div>
    );
};

export default Avatar