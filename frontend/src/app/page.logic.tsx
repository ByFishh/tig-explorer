import { useDialogs } from '@/store/dialogsReducer/dialogsReducer';
import { IAction as DialogsAction } from '@/store/dialogsReducer/dialogsReducer.types';
import { IAction as NodesAction } from '@/store/nodesReducer/nodesReducer.types';
import { useTigPrice } from '@/store/tigPriceReducer/tigPriceReducer';
import { IModals } from '@/types/IModals/IModals';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as ls from '../utils/localStorage';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { useNodes } from '@/store/nodesReducer/nodesReducer';
import { convertMonthToHour } from '@/utils/convertMonthToHour';
import { ITableData } from '@/types/ITableData/ITableData';
import { useTableData } from '@/store/tableDataReducer/tableDataReducer';
import { IAction as TableDataAction } from '@/store/tableDataReducer/tableDataReducer.types';
import { IAction as InvalidNodesAction } from '@/store/invalidNodes/invalidNodes.types';
import { useInvalidNodes } from '@/store/invalidNodes/invalidNodes';
import { INodeDialogType } from '@/types/INodeDialogType/INodeDialogType';
import { getNodePreview } from '@/apis/node/node.action';

export const usePage = () => {
  const { handleSubmit, control } = useForm<{ search: string }>();
  const { dispatch: dialogsDispatch } = useDialogs();
  const { nodes, dispatch: nodesDispatch } = useNodes();
  const { tigPrice } = useTigPrice();
  const { tableData, dispatch: tableDataDispatch } = useTableData();
  const { invalidNodes, dispatch: invalidNodesDispatch } = useInvalidNodes();

  // Refs
  const tableDataRef = useRef<ITableData[]>([]);

  // States
  const [keyword, setKeyword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showInvalidNodes, setShowInvalidNodes] = useState<boolean>(true);

  useEffect(() => {
    if (nodes.length) return;
    getAllNodes();
    getShowInvalidNodes();
  }, []);

  useEffect(() => {
    if (!nodes || JSON.stringify(nodes) === JSON.stringify([])) return;
    getAllServerNodes();
  }, [nodes]);

  useEffect(() => {
    handleIsLoading();
  }, [tableData, invalidNodes, nodes, isLoading]);

  const onSubmit: SubmitHandler<{ search: string }> = (data: {
    search: string;
  }) => {
    setKeyword(data.search);
  };

  const handleIsLoading = () => {
    if (!isLoading || !nodes.length) return;
    if (tableData.length !== 0) setIsLoading(false);
    if (invalidNodes.length === nodes.length) setIsLoading(false);
  };

  const getShowInvalidNodes = () => {
    const bool: boolean | null = ls.getItem({
      key: ILocalStorageKey.SHOW_INVALID_NODES,
    });
    if (typeof bool !== 'boolean') return;
    setShowInvalidNodes(bool);
  };
  const getAllNodes = () => {
    const nodes = ls.getItem({ key: ILocalStorageKey.NODES });
    nodesDispatch({ action: NodesAction.SET_NODES, payload: nodes ?? [] });
    if (JSON.stringify(nodes) === JSON.stringify([]) || !nodes)
      setIsLoading(false);
  };

  const getAllServerNodes = async () => {
    const nodesPreview: ITableData[] = tableDataRef.current;
    for (const n of nodes) {
      try {
        const nodeIsAlreadyInvalid = invalidNodes.find((i) => i.id === n.id);
        if (nodeIsAlreadyInvalid) continue;
        const alreadyFetched = tableDataRef.current.find(
          (tb) => tb.id === n.id,
        );
        if (alreadyFetched) continue;
        const node = await getNodePreview(n.id).catch(() => {
          throw n.id;
        });
        const data: ITableData = { ...node, ...n };
        tableDataRef.current.push(data);
        tableDataDispatch({
          action: TableDataAction.SET_TABLE_DATA,
          payload: JSON.parse(JSON.stringify(nodesPreview)),
        });
      } catch (error) {
        if (typeof error === 'string') {
          const item = nodes.find((n) => n.id === error);
          if (!item) continue;
          invalidNodesDispatch({
            action: InvalidNodesAction.ADD_INVALID_NODES,
            payload: item,
          });
        }
        continue;
      }
    }
  };

  const openNodeDialog = useCallback(() => {
    dialogsDispatch({
      action: DialogsAction.OPEN_MODAL,
      payload: { isOpen: IModals.NODE, data: { type: INodeDialogType.ADD } },
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

  const getTableData = useMemo(() => {
    return tableData.filter((td) =>
      keyword === undefined
        ? td
        : td.id.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) && td,
    );
  }, [keyword, tableData]);

  const anyNode = !!getTableData.length || !!invalidNodes.length;

  const handleShowInvalidNodes = (e: React.FormEvent<HTMLButtonElement>) => {
    const newValue = !showInvalidNodes;
    setShowInvalidNodes(newValue);
    ls.setItem({ key: ILocalStorageKey.SHOW_INVALID_NODES, item: newValue });
  };

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
    getTableData,
    onSubmit,
    handleSubmit,
    isLoading,
    keyword,
    anyNode,
    showInvalidNodes,
    handleShowInvalidNodes,
  };
};
