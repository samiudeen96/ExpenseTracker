import { useIsFetching } from '@tanstack/react-query';
import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect, useState } from 'react';


const GlobalLoading = () => {
  const isFetching = useIsFetching();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isFetching > 0) setShow(true);
    else setTimeout(() => setShow(false), 300); // slight delay for smooth exit
  }, [isFetching]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm transition-opacity duration-300">
      <Player
        autoplay
        loop
        src="https://lottie.host/f47af21a-a4c1-49d2-9ce8-3c78f6c8eb4a/qR7caYEf3x.json"
        style={{ height: '350px', width: '350px' }}
      />
    </div>
  );
};


export default GlobalLoading;
