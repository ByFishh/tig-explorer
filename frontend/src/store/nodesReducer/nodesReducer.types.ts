import { INodeInputs } from '@/types/INodeInputs/INodeInputs';
import { Immutable } from '../../types/Immutable/Immutable';

export type S = {
  nodes: Immutable<INodeInputs[]>;
  dispatch: (args: { action: IAction; payload?: unknown }) => void;
};

export enum IAction {
  SET_NODES = 'set_node',
  ADD_NODE = 'add_node',
  UPDATE_NODE = 'update_node',
  REMOVE_NODE = 'remove_node',
}
