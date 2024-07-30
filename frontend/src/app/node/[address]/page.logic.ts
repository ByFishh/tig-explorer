'use client';

import { getEntireNode } from '@/apis/api';
import { INode } from '@/types/INode/INode';
import { useEffect, useState } from 'react';

export const usePage = (address: string) => {
  const [node, setNode] = useState<INode | null>(null);

  useEffect(() => {
    getNode();
  }, []);

  const getNode = async () => {
    const node = await getEntireNode(address, 500);
    setNode(node);
  };

  return {
    address,
    node,
  };
};
