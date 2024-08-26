import { IBenchmarkerInputs } from '@/types/IBenchmarkerInputs/IBenchmarkerInputs';
import { Immutable } from '../../types/Immutable/Immutable';

export type S = {
  benchmarkers: Immutable<IBenchmarkerInputs[]>;
  dispatch: (args: { action: IAction; payload?: unknown }) => void;
};

export enum IAction {
  SET_BENCHMARKERS = 'set_benchmarkers',
  ADD_BENCHMARKER = 'add_benchmarker',
  UPDATE_BENCHMARKER = 'update_benchmarker',
  REMOVE_BENCHMARKER = 'remove_bechnmarker',
}
