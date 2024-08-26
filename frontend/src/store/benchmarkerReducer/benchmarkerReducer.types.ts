import { IBenchmarker } from '@/types/IBenchmarker/IBenchmarker';
import { Immutable } from '../../types/Immutable/Immutable';

export type S = {
  benchmarker: Immutable<IBenchmarker | null>;
  dispatch: (args: { action: IAction; payload?: unknown }) => void;
};

export enum IAction {
  SET_BENCHMARKER = 'set_benchmarker',
  REMOVE_BENCHMARKER = 'remove_benchmarker',
}
