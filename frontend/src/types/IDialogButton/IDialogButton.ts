import { IModals } from '../IModals/IModals';

export type IDialogButton = {
  dialog: IModals;
  title: string;
  icon: JSX.Element;
  data?: any;
};
