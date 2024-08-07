'use client';

import { useNode } from '@/store/nodeReducer/nodeReducer';
import { IAction } from '@/store/nodeReducer/nodeReducer.types';
import { useTigPrice } from '@/store/tigPriceReducer/tigPriceReducer';
import { useEffect, useState } from 'react';
import * as ls from '../../../utils/localStorage';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { INodeInputs } from '@/types/INodeInputs/INodeInputs';
import { convertMonthToHour } from '@/utils/convertMonthToHour';
import { getNodeBase } from '@/apis/node/node.action';
import { getBalance } from '@/apis/balance/balance.action';
import { getAverageSinceStart } from '@/utils/getAverageSinceStart';
import { getCostSinceStartPerNode } from '@/utils/getCostSinceStartPerNode';

export const usePage = (address: string) => {
  const { node, dispatch } = useNode();
  const { tigPrice } = useTigPrice();

  // State
  const [_, setRender] = useState<[]>([]);

  useEffect(() => {
    getNode();
  }, []);

  const getNode = async () => {
    const node = await getNodeBase(address);
    const balance = await getBalance(address);
    dispatch({
      action: IAction.SET_NODE,
      payload: {
        ...node,
        wallet_balance: {
          balance,
          address,
        },
      },
    });
  };

  const nodeIsConfigured = () => {
    if (!ls.getItem({ key: ILocalStorageKey.NODES })) return false;
    const item: INodeInputs = ls.findItemById({
      key: ILocalStorageKey.NODES,
      id: address,
    });
    return !!item?.serverCost;
  };

  const nodeHasStartDate = () => {
    if (!ls.getItem({ key: ILocalStorageKey.NODES })) return false;
    const item: INodeInputs = ls.findItemById({
      key: ILocalStorageKey.NODES,
      id: address,
    });
    return !!item?.startDate;
  };

  const getAverageTigSinceStart = (): number | null => {
    if (!ls.getItem({ key: ILocalStorageKey.NODES })) return null;
    const item: INodeInputs = ls.findItemById({
      key: ILocalStorageKey.NODES,
      id: address,
    });
    if (!item.startDate || !node) return null;
    const { hours, total } = getAverageSinceStart(
      item.startDate,
      node.total_earned.reward,
    );
    return total / hours;
  };

  const getCostSinceStart = (): number | null => {
    if (!ls.getItem({ key: ILocalStorageKey.NODES })) return null;
    const item: INodeInputs = ls.findItemById({
      key: ILocalStorageKey.NODES,
      id: address,
    });
    if (!item.startDate || !item.serverCost || !node) return null;
    const costSinceStart = getCostSinceStartPerNode(
      item.serverCost,
      item.startDate ?? '',
      node?.total_earned.reward,
    );
    return costSinceStart;
  };

  const renderCards = () => setRender([]);

  const getCostPerTig = (): number => {
    const item: INodeInputs = ls.findItemById({
      key: ILocalStorageKey.NODES,
      id: address,
    });
    if (!item || !item.serverCost || !node?.average_rewards.reward) return 0;
    const serverCostInHour = convertMonthToHour(item.serverCost);
    return serverCostInHour / node?.average_rewards.reward;
  };

  return {
    address,
    node,
    tigPrice,
    nodeIsConfigured,
    renderCards,
    getCostPerTig,
    getAverageTigSinceStart,
    nodeHasStartDate,
    getCostSinceStart,
  };
};
