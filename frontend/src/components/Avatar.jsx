import React, { useContext } from 'react'
import { ExpContext } from '../context/ExpContext'
import { convertedName, getInitials } from '../utils/helper'

const Avatar = () => {
    const { userDetails } = useContext(ExpContext)



    return (
        <div className="flex flex-col items-center pt-5">
            <div className="bg-background h-20 w-20 rounded-full flex items-center justify-center">
                {/* <img className="shadow-sm" src='' alt="" /> */}
                <p className='text-3xl'>{getInitials(userDetails.name)}</p>
            </div>
            <p className="mt-2 font-medium">{convertedName(userDetails.name)}</p>
        </div>
    )
}

export default Avatar