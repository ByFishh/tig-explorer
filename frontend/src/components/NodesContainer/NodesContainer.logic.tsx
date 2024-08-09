import { getNodePreview } from '@/apis/node/node.action';
import { useNodes } from '@/store/nodesReducer/nodesReducer';
import { useTableData } from '@/store/tableDataReducer/tableDataReducer';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import { useEffect, useRef } from 'react';
import { IAction as NodesAction } from '@/store/nodesReducer/nodesReducer.types';
import { IAction as TableDataAction } from '@/store/tableDataReducer/tableDataReducer.types';
import { ITableData } from '@/types/ITableData/ITableData';
import { useTableDataContext } from '@/context/TableDataContext/TableDataContext';
import { INodesContainer } from '@/types/INodesContainer/INodesContainer';
import * as ls from '../../utils/localStorage';

export const useNodesContainer = (props: INodesContainer) => {
  const { nodes, dispatch: nodesDispatch } = useNodes();
  const { dispatch: tableDataDispatch } = useTableData();
  const { tableDataRef } = useTableDataContext();

  useEffect(() => {
    if (nodes.length) return;
    getAllNodes();
  }, []);

  useEffect(() => {
    if (!nodes || JSON.stringify(nodes) === JSON.stringify([])) return;
    getAllServerNodes();
  }, [nodes]);

  const getAllNodes = () => {
    const nodes = ls.getItem({ key: ILocalStorageKey.NODES });
    nodesDispatch({ action: NodesAction.SET_NODES, payload: nodes ?? [] });
    if (JSON.stringify(nodes) === JSON.stringify([]) || !nodes)
      props.trigger(false);
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

      tableDataDispatch({
        action: TableDataAction.SET_TABLE_DATA,
        payload: JSON.parse(JSON.stringify(nodesPreview)),
      });
    }
  };
};
