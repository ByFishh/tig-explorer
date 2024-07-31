'use client';

import { getEntireNodes } from '@/apis/api';
import { useEffect, useState } from 'react';

const addresses = [];

export const usePage = () => {
  const [nodes, setNodes] = useState<any[]>([]);

  useEffect(() => {
    getNodes();
  }, []);

  const getNodes = async () => {
    const nodes = await getEntireNodes(addresses, 120);
    console.log(nodes);
    setNodes(nodes);
  };

  return {
    nodes,
  };
};
