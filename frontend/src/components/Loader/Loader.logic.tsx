import { useBenchmarkersData } from '@/hooks/useBenchmarkersData';
import { usebenchmarkers } from '@/store/benchmarkersReducer/benchmarkersReducer';
import { ILoader } from '@/types/ILoader/ILoader';
import { useEffect } from 'react';

export const useLoader = (props: ILoader) => {
  const { tableData, getBenchmarkers } = useBenchmarkersData();
  const { benchmarkers: benchmarkers } = usebenchmarkers();

  useEffect(() => {
    handleIsLoading();
  }, [tableData, benchmarkers, props.isLoading]);

  const handleIsLoading = () => {
    if (!props.isLoading || !benchmarkers.length) return;
    if (getBenchmarkers.valid.length !== 0) props.trigger(false);
    if (getBenchmarkers.invalid.length === benchmarkers.length)
      props.trigger(false);
  };
};
