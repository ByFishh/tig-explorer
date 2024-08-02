import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { IAction as DialogsAction } from '@/store/dialogsReducer/dialogsReducer.types';
import { IAction as NodesAction } from '@/store/nodesReducer/nodesReducer.types';
import { useTigPrice } from '@/store/tigPriceReducer/tigPriceReducer';
import { IModals } from '@/types/IModals/IModals';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ls from '../utils/localStorage';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { useNodes } from '@/store/nodesReducer/nodesReducer';
import { IAverageRewards, ITotalEarned } from '@/types/INode/INode';
import { getNodePreview } from '@/apis/api';
import { INodeInputs } from '@/types/INodeInputs/INodeInputs';
import { convertMonthToHour } from '@/utils/convertMonthToHour';

type T = INodeInputs & { id: string } & {
  total_earned: ITotalEarned;
  average_rewards: IAverageRewards;
};

export const usePage = () => {
  const { control } = useForm<{ search: string }>();
  const { dispatch: dialogsDispatch } = useDialogs();
  const { nodes, dispatch: nodesDispatch } = useNodes();
  const { tigPrice } = useTigPrice();

  // Refs
  const tableDataRef = useRef<T[]>([]);

  // States
  const [tableData, setTableData] = useState<T[]>([]);
  const [invalidNodes, setInvalidNodes] = useState<
    Array<INodeInputs & { id: string }>
  >([]);

  useEffect(() => {
    if (nodes.length) return;
    getAllNodes();
  }, []);

  useEffect(() => {
    if (JSON.stringify(nodes) === JSON.stringify([]) || !nodes) return;
    getAllServerNodes();
  }, [nodes]);

  const getAllNodes = () => {
    const nodes = ls.getItem({ key: ILocalStorageKey.NODES });
    nodesDispatch({ action: NodesAction.SET_NODES, payload: nodes ?? [] });
  };

  const getAllServerNodes = async () => {
    const nodesPreview: T[] = tableDataRef.current;
    for (const n of nodes) {
      try {
        const alreadyFetched = tableDataRef.current.find(
          (tb) => tb.id === n.id,
        );
        if (alreadyFetched) continue;
        const node = await getNodePreview(n.id);
        if (!node || typeof node === 'string') throw n.id;
        const data: T = { ...node, ...n };
        tableDataRef.current.push(data);
        setTableData(JSON.parse(JSON.stringify(nodesPreview)));
      } catch (error) {
        if (typeof error === 'string') {
          const item = nodes.find((n) => n.id === error);
          if (item) setInvalidNodes((prev) => [...prev, item]);
        }
        continue;
      }
    }
  };

  const openNodeDialog = useCallback(() => {
    dialogsDispatch({
      action: DialogsAction.OPEN_MODAL,
      payload: { isOpen: IModals.NODE },
    });
  }, []);

  const getCostPerTig = (serverCost: number, reward: number): number => {
    const serverCostInHour = convertMonthToHour(serverCost);
    return serverCostInHour / reward;
  };

  const getTotalEarned = useMemo(() => {
    return tableData.reduce((total, item) => {
      return total + item.total_earned.reward;
    }, 0);
  }, [tableData]);

  const getAverageEarned = useMemo(() => {
    return tableData.reduce((total, item) => {
      return total + item.average_rewards.reward;
    }, 0);
  }, [tableData]);

  const allNodesAreConfigured = useMemo(() => {
    return tableData.every((td) => td.serverCost);
  }, [tableData]);

  const getAllServerCost = useMemo(() => {
    return tableData.reduce((total, item) => {
      return total + item.serverCost;
    }, 0);
  }, [tableData]);

  return {
    tigPrice,
    control,
    openNodeDialog,
    tableData,
    nodes,
    getCostPerTig,
    getTotalEarned,
    getAverageEarned,
    allNodesAreConfigured,
    getAllServerCost,
    invalidNodes,
  };
};
