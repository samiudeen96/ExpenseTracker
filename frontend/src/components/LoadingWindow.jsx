import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const LoadingWindow = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <Player
        autoplay
        loop
        // src="https://assets10.lottiefiles.com/packages/lf20_3rwasyjy.json" // Replace with your chosen animation URL
        src="https://lottie.host/f47af21a-a4c1-49d2-9ce8-3c78f6c8eb4a/qR7caYEf3x.json"
        style={{ height: '350px', width: '350px' }}
      />
    </div>
  );
};

export default LoadingWindow;
