import { INode } from '@/types/INode/INode';
import { Immutable } from '../../types/Immutable/Immutable';

export type S = {
  node: Immutable<INode | null>;
  dispatch: (args: { action: IAction; payload?: unknown }) => void;
};

export enum IAction {
  SET_NODE = 'set_node',
  REMOVE_NODE = 'remove_node',
}
