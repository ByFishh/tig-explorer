'use client';

import { useBenchmarker } from '@/store/benchmarkerReducer/benchmarkerReducer';
import { IAction } from '@/store/benchmarkerReducer/benchmarkerReducer.types';
import { useTigPrice } from '@/store/tigPriceReducer/tigPriceReducer';
import { useEffect, useState } from 'react';
import * as ls from '../../../utils/localStorage';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { IBenchmarkerInputs } from '@/types/IBenchmarkerInputs/IBenchmarkerInputs';
import { convertMonthToHour } from '@/utils/convertMonthToHour';
import { getBenchmarkerBase } from '@/apis/benchmarker/benchmarker.action';
import { getBalance } from '@/apis/balance/balance.action';
import { getAverageSinceStart } from '@/utils/getAverageSinceStart';
import { getCostSinceStartPerBenchmarker } from '@/utils/getCostSinceStartPerbenchmarker';

export const usePage = (address: string) => {
  const { benchmarker: benchmarker, dispatch } = useBenchmarker();
  const { tigPrice } = useTigPrice();

  // State
  const [_, setRender] = useState<[]>([]);

  useEffect(() => {
    getBenchmarker();
  }, []);

  const getBenchmarker = async () => {
    const benchmarker = await getBenchmarkerBase(address);
    const balance = await getBalance(address);
    dispatch({
      action: IAction.SET_BENCHMARKER,
      payload: {
        ...benchmarker,
        wallet_balance: balance,
      },
    });
  };

  const benchmarkerIsConfigured = () => {
    if (!ls.getItem({ key: ILocalStorageKey.BENCHMARKERS })) return false;
    const item: IBenchmarkerInputs = ls.findItemById({
      key: ILocalStorageKey.BENCHMARKERS,
      id: address,
    });
    return !!item?.serverCost;
  };

  const benchmarkerHasStartDate = () => {
    if (!ls.getItem({ key: ILocalStorageKey.BENCHMARKERS })) return false;
    const item: IBenchmarkerInputs = ls.findItemById({
      key: ILocalStorageKey.BENCHMARKERS,
      id: address,
    });
    return !!item?.startDate;
  };

  const getAverageTigSinceStart = (): number | null => {
    if (!ls.getItem({ key: ILocalStorageKey.BENCHMARKERS })) return null;
    const item: IBenchmarkerInputs = ls.findItemById({
      key: ILocalStorageKey.BENCHMARKERS,
      id: address,
    });
    if (!item.startDate || !benchmarker) return null;
    const { hours, total } = getAverageSinceStart(
      item.startDate,
      benchmarker.total_earned,
    );
    return total / hours;
  };

  const getCostSinceStart = (): number | null => {
    if (!ls.getItem({ key: ILocalStorageKey.BENCHMARKERS })) return null;
    const item: IBenchmarkerInputs = ls.findItemById({
      key: ILocalStorageKey.BENCHMARKERS,
      id: address,
    });
    if (!item.startDate || !item.serverCost || !benchmarker) return null;
    const costSinceStart = getCostSinceStartPerBenchmarker(
      item.serverCost,
      item.startDate ?? '',
      benchmarker?.total_earned,
    );
    return costSinceStart;
  };

  const renderCards = () => setRender([]);

  const getCostPerTig = (): number => {
    const item: IBenchmarkerInputs = ls.findItemById({
      key: ILocalStorageKey.BENCHMARKERS,
      id: address,
    });
    if (!item || !item.serverCost || !benchmarker?.average_rewards) return 0;
    const serverCostInHour = convertMonthToHour(item.serverCost);
    return serverCostInHour / benchmarker?.average_rewards;
  };

  return {
    address,
    benchmarker,
    tigPrice,
    benchmarkerIsConfigured,
    renderCards,
    getCostPerTig,
    getAverageTigSinceStart,
    benchmarkerHasStartDate,
    getCostSinceStart,
  };
};
