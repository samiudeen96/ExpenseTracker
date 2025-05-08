import React from 'react'

const TotalSkeleton = () => {
    return (
        <div className="flex-1">
            <div className="shadow-sm flex bg-white rounded-md p-4 items-center gap-4 animate-pulse">
                <div className="rounded-full w-11 h-11 bg-gray-300 flex items-center justify-center shadow-md">
                    {/* Icon placeholder */}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="h-5 bg-gray-300 rounded w-32"></div>
                </div>
            </div>
        </div>

    )
}

export default TotalSkeleton