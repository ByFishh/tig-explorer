import { INodeInputs } from '@/types/INodeInputs/INodeInputs';

export type S = {
  nodes: Array<INodeInputs & { id: string }>;
  dispatch: (args: { action: IAction; payload?: unknown }) => void;
};

export enum IAction {
  SET_NODES = 'set_node',
}
