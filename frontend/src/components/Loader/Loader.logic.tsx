import { useNodesData } from '@/hooks/useNodesData';
import { useNodes } from '@/store/nodesReducer/nodesReducer';
import { ILoader } from '@/types/ILoader/ILoader';
import { useEffect } from 'react';

export const useLoader = (props: ILoader) => {
  const { tableData, getNodes } = useNodesData();
  const { nodes } = useNodes();

  useEffect(() => {
    handleIsLoading();
  }, [tableData, nodes, props.isLoading]);

  const handleIsLoading = () => {
    if (!props.isLoading || !nodes.length) return;
    if (getNodes.valid.length !== 0) props.trigger(false);
    if (getNodes.invalid.length === nodes.length) props.trigger(false);
  };
};
