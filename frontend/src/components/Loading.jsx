import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const Loading = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-white">
            <Player
                autoplay
                loop
                // src="https://assets10.lottiefiles.com/packages/lf20_3rwasyjy.json" // Replace with your chosen animation URL
                src="https://assets10.lottiefiles.com/packages/lf20_3rwasyjy.json"
                style={{ height: '350px', width: '350px' }}
            />
        </div>
    )
}

export default Loading