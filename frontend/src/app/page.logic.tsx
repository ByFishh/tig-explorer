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
import { IAction as NotifcationAction } from '@/store/notificationsReducer/notificationsReducer.types';
import { INodeDialogType } from '@/types/INodeDialogType/INodeDialogType';
import { getNodePreview } from '@/apis/node/node.action';
import { getAverageSinceStart } from '@/utils/getAverageSinceStart';
import { getCostSinceStartPerNode } from '@/utils/getCostSinceStartPerNode';
import { useNotifications } from '@/store/notificationsReducer/notificationsReducer';
import { v4 as uuidv4 } from 'uuid';
import { INotificationState } from '@/types/INotificationState/INotificationState';

export const usePage = () => {
  const { handleSubmit, control } = useForm<{ search: string }>();
  const { dispatch: dialogsDispatch } = useDialogs();
  const { nodes, dispatch: nodesDispatch } = useNodes();
  const { tigPrice } = useTigPrice();
  const { tableData, dispatch: tableDataDispatch } = useTableData();
  const { dispatch: notificationsDispatch } = useNotifications();

  // Refs
  const tableDataRef = useRef<ITableData[]>([]);

  // States
  const [keyword, setKeyword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const notificationsTrigger = useRef<boolean>(false);
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
  }, [tableData, nodes, isLoading]);

  const onSubmit: SubmitHandler<{ search: string }> = (data: {
    search: string;
  }) => {
    setKeyword(data.search);
  };

  const getNodes = useMemo(() => {
    const valid = tableData.filter((i) => !i.invalid);
    const invalid = tableData.filter((i) => i.invalid);
    return { valid, invalid };
  }, [tableData]);

  const validNodesInformation = useMemo(() => {
    const allServerCost = getNodes.valid.reduce((total, item) => {
      return total + item.serverCost;
    }, 0);

    const allAreConfigured = getNodes.valid.every((td) => td.serverCost);

    const allHaveStartDate = getNodes.valid.every((gt) => gt.startDate);

    const averageEarned = getNodes.valid.reduce((total, item) => {
      return total + item.average_rewards.reward;
    }, 0);

    const totalEarned = getNodes.valid.reduce((total, item) => {
      return total + item.total_earned.reward;
    }, 0);

    const getTigEanedSinceStart = getNodes.valid.reduce(
      (acc, item) => {
        const { hours, total } = getAverageSinceStart(
          item.startDate ?? '',
          item.total_earned.reward,
        );
        acc.totalHours += hours;
        acc.grandTotal += total;
        return acc;
      },
      { totalHours: 0, grandTotal: 0 },
    );

    const costSinceStart = getNodes.valid.reduce((total, item) => {
      return (
        total +
        getCostSinceStartPerNode(
          item.serverCost,
          item.startDate ?? '',
          item.total_earned.reward,
        )
      );
    }, 0);

    return {
      allServerCost,
      allAreConfigured,
      averageEarned,
      totalEarned,
      allHaveStartDate,
      costSinceStart,
      getTigEanedSinceStart:
        getTigEanedSinceStart.grandTotal / getTigEanedSinceStart.totalHours,
    };
  }, [getNodes.valid]);

  const handleIsLoading = () => {
    if (!isLoading || !nodes.length) return;
    if (getNodes.valid.length !== 0) setIsLoading(false);
    if (getNodes.invalid.length === nodes.length) setIsLoading(false);
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
      const nodeIsAlreadyHere = tableDataRef.current.find((i) => i.id === n.id);
      if (nodeIsAlreadyHere) continue;
      let newNode: ITableData = {} as any;
      await getNodePreview(n.id)
        .then((node) => {
          newNode = { ...node, ...n, invalid: false };
        })
        .catch(() => {
          newNode = {
            total_earned: { address: n.id, reward: 0 },
            average_rewards: { address: n.id, reward: 0 },
            ...n,
            invalid: true,
          };
        });
      tableDataRef.current.push(newNode);

      if (
        tableDataRef.current.length >= nodes.length &&
        notificationsTrigger.current
      ) {
        if (newNode.invalid) {
          notificationsDispatch({
            action: NotifcationAction.ADD_NOTIFICATION,
            payload: {
              id: uuidv4(),
              state: INotificationState.FAIL,
              message: 'Unable to retrieve information from this node',
            },
          });
        } else {
          notificationsDispatch({
            action: NotifcationAction.ADD_NOTIFICATION,
            payload: {
              id: uuidv4(),
              state: INotificationState.SUCCESS,
              message: 'New node added',
            },
          });
        }
      }

      if (tableDataRef.current.length === nodes.length)
        notificationsTrigger.current = true;

      tableDataDispatch({
        action: TableDataAction.SET_TABLE_DATA,
        payload: JSON.parse(JSON.stringify(nodesPreview)),
      });
    }
  };

  const openNodeDialog = useCallback(() => {
    dialogsDispatch({
      action: DialogsAction.OPEN_MODAL,
      payload: { isOpen: IModals.NODE, data: { type: INodeDialogType.ADD } },
    });
  }, []);

  const getTableData = useMemo(() => {
    return getNodes.valid.filter((td) =>
      keyword === undefined
        ? td
        : td.id.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) && td,
    );
  }, [keyword, getNodes.valid]);

  const handleShowInvalidNodes = (e: React.FormEvent<HTMLButtonElement>) => {
    const newValue = !showInvalidNodes;
    setShowInvalidNodes(newValue);
    ls.setItem({ key: ILocalStorageKey.SHOW_INVALID_NODES, item: newValue });
  };

  const onDelete = useCallback((id: string) => {
    tableDataRef.current = tableDataRef.current.filter((tdr) => tdr.id !== id);
  }, []);

  return {
    tigPrice,
    control,
    openNodeDialog,
    nodes,
    validNodesInformation,
    getNodes,
    getTableData,
    onSubmit,
    handleSubmit,
    isLoading,
    keyword,
    showInvalidNodes,
    handleShowInvalidNodes,
    onDelete,
  };
};
