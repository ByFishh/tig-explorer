import { useCallback, useState } from 'react';
import copy from 'copy-to-clipboard';
import { IAddress } from '@/types/IAddress/IAddress';
import { useNotifications } from '@/store/notificationsReducer/notificationsReducer';
import { IAction } from '@/store/notificationsReducer/notificationsReducer.types';
import { v4 as uuidv4 } from 'uuid';
import { INotificationState } from '@/types/INotificationState/INotificationState';

export const useAddress = (props: IAddress) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { dispatch } = useNotifications();

  const toggleView = () => setToggle(!toggle);

  const onCopy = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      copy(props.address);
      dispatch({
        action: IAction.ADD_NOTIFICATION,
        payload: {
          id: uuidv4(),
          state: INotificationState.SUCCESS,
          message: `Address ${props.address} copied`,
        },
      });
    },
    [],
  );

  return { toggle, toggleView, onCopy };
};
