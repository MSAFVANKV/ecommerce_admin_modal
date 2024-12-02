import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom hook for handling navigation clicks
const useNavigateClicks = () => {
  // console.log('clicks components');
  
  const router = useNavigate();

  const handleClick = useCallback((redirect: string) => {
    router(redirect);
  }, [router]);

  return {
    handleClick,
  };
};

export default useNavigateClicks;
