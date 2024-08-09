import { useNodesData } from '@/hooks/useNodesData';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { useEffect, useState } from 'react';
import * as ls from '../../utils/localStorage';

export const useInvalidNodes = () => {
  const [showInvalidNodes, setShowInvalidNodes] = useState<boolean>(true);

  useEffect(() => {
    getShowInvalidNodes();
  }, []);

  const getShowInvalidNodes = () => {
    const bool: boolean | null = ls.getItem({
      key: ILocalStorageKey.SHOW_INVALID_NODES,
    });
    if (typeof bool !== 'boolean') return;
    setShowInvalidNodes(bool);
  };

  const handleShowInvalidNodes = () => {
    const newValue = !showInvalidNodes;
    setShowInvalidNodes(newValue);
    ls.setItem({ key: ILocalStorageKey.SHOW_INVALID_NODES, item: newValue });
  };

  const { getNodes } = useNodesData();
  return { getNodes, showInvalidNodes, handleShowInvalidNodes };
};
