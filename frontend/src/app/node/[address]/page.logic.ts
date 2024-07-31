'use client';

import { getEntireNode } from '@/apis/api';
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
    const node = await getEntireNode(address, 120);
    setNode(node);
  };

  return {
    address,
    node,
    tigPrice,
  };
};
