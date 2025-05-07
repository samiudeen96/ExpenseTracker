import React from 'react'

const LoadingWindow = () => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
    );
};


export default LoadingWindow