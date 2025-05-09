import { useIsFetching } from '@tanstack/react-query';

const GlobalLoading = () => {
  const isFetching = useIsFetching(); // number of ongoing queries

  if (isFetching === 0) return null;

  return (
    <div className="fixed inset-0 bg-white/70 z-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default GlobalLoading;
