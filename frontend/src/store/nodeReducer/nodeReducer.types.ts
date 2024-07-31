import { INode } from '@/types/INode/INode';

export type S = {
  node: INode | null;
  dispatch: (args: { action: IAction; payload?: unknown }) => void;
};

export enum IAction {
  SET_NODE = 'set_node',
  REMOVE_NODE = 'remove_node',
}
