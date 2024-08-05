import { INotification } from '@/types/INotification/INotification';
import { Immutable } from '../../types/Immutable/Immutable';

export type S = {
  notifications: Immutable<INotification[]>;
  dispatch: (args: { action: IAction; payload?: unknown }) => void;
};

export enum IAction {
  ADD_NOTIFICATION = 'add_notification',
  REMOVE_NOTIFICATION = 'remove_notification',
}
