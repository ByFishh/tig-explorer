import { useBenchmarkersData } from '@/hooks/useBenchmarkersData';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { useEffect, useState } from 'react';
import * as ls from '../../utils/localStorage';

export const useInvalidBenchmarkers = () => {
  const [showInvalidBenchmarkers, setShowInvalidBenchmarkers] =
    useState<boolean>(true);

  useEffect(() => {
    getShowInvalidBenchmarkers();
  }, []);

  const getShowInvalidBenchmarkers = () => {
    const bool: boolean | null = ls.getItem({
      key: ILocalStorageKey.SHOW_INVALID_BENCHMARKERS,
    });
    if (typeof bool !== 'boolean') return;
    setShowInvalidBenchmarkers(bool);
  };

  const handleShowInvalidBenchmarkers = () => {
    const newValue = !showInvalidBenchmarkers;
    setShowInvalidBenchmarkers(newValue);
    ls.setItem({
      key: ILocalStorageKey.SHOW_INVALID_BENCHMARKERS,
      item: newValue,
    });
  };

  const { getBenchmarkers } = useBenchmarkersData();
  return {
    getBenchmarkers,
    showInvalidBenchmarkers,
    handleShowInvalidBenchmarkers,
  };
};
