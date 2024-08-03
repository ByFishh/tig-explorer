import { INodeInputs } from '@/types/INodeInputs/INodeInputs';
import { Immutable } from '../../types/Immutable/Immutable';

export type S = {
  invalidNodes: Immutable<INodeInputs[]>;
  dispatch: (args: { action: IAction; payload?: unknown }) => void;
};

export enum IAction {
  ADD_INVALID_NODES = 'add_invalid_nodes',
  EDIT_INVALID_NODES = 'edit_invalid_nodes',
  REMOVE_INVALID_NODES = 'remove_invalid_nodes',
}
