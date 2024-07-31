'use client';

import { getBalance, getBaseNode } from '@/apis/api';
import { useTigPrice } from '@/store/tigPriceReducer/tigPriceReducer';
import { INode } from '@/types/INode/INode';
import { useEffect, useState } from 'react';

export const usePage = (address: string) => {
  const [node, setNode] = useState<INode | null>(null);
  const { tigPrice } = useTigPrice();

  useEffect(() => {
    getNode();
  }, []);

  const getNode = async () => {
    const node = await getBaseNode(address);
    const balance = await getBalance(address);

    setNode({
      ...node,
      wallet_balance: {
        balance,
        address,
      },
    });
  };

  return {
    address,
    node,
    tigPrice,
  };
};
