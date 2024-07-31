'use client';

import { getBalance, getBaseNode } from '@/apis/api';
import { useNode } from '@/store/nodeReducer/nodeReducer';
import { IAction } from '@/store/nodeReducer/nodeReducer.types';
import { useTigPrice } from '@/store/tigPriceReducer/tigPriceReducer';
import { useEffect, useState } from 'react';
import * as ls from '../../../utils/localStorage';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { INodeInputs } from '@/types/INodeInputs/INodeInputs';
import { convertMonthToHour } from '@/utils/convertMonthToHour';

export const usePage = (address: string) => {
  const { node, dispatch } = useNode();
  const { tigPrice } = useTigPrice();

  // State
  const [_, setRender] = useState<[]>([]);

  useEffect(() => {
    getNode();
  }, []);

  const getNode = async () => {
    const node = await getBaseNode(address);
    console.log(node, 'NODE');
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
    const item: INodeInputs = ls.findItemById({
      key: ILocalStorageKey.NODES,
      id: address,
    });
    return !!item?.serverCost;
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
  };
};
