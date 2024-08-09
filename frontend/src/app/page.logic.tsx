import { useCallback, useState } from 'react';

export const usePage = () => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const triggerLoader = useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  return {
    isLoading,
    triggerLoader,
  };
};
