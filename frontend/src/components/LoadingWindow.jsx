import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const LoadingWindow = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <Player
        autoplay
        loop
        src="https://assets10.lottiefiles.com/packages/lf20_3rwasyjy.json" // Replace with your chosen animation URL
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  );
};

export default LoadingWindow;
