'use client';

import { getBalance, getBaseNode } from '@/apis/api';
import { useNode } from '@/store/nodeReducer/nodeReducer';
import { IAction } from '@/store/nodeReducer/nodeReducer.types';
import { useTigPrice } from '@/store/tigPriceReducer/tigPriceReducer';
import { useEffect, useState } from 'react';

export const usePage = (address: string) => {
  const { node, dispatch } = useNode();
  const { tigPrice } = useTigPrice();

  useEffect(() => {
    getNode();
  }, []);

  const getNode = async () => {
    const node = await getBaseNode(address);
    dispatch({ action: IAction.SET_NODE, payload: node });
  };

  return {
    address,
    node,
    tigPrice,
  };
};
