import { useNotifications } from '@/store/notificationsReducer/notificationsReducer';
import { IAction } from '@/store/notificationsReducer/notificationsReducer.types';
import { INotificationState } from '@/types/INotificationState/INotificationState';
import { CheckIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useEffect, useRef } from 'react';

export const useNotificationsLogic = () => {
  const { notifications, dispatch } = useNotifications();

  const dataRef = useRef<string[]>([]);

  useEffect(() => {
    handleNotifications();
  }, [notifications]);

  const handleNotifications = () => {
    notifications.forEach((n) => {
      if (dataRef.current.includes(n.id)) return;
      dataRef.current.push(n.id);
      setTimeout(() => {
        dispatch({ action: IAction.REMOVE_NOTIFICATION, payload: n.id });
      }, 5000);
    });
  };

  const getIcon = (state: INotificationState): JSX.Element => {
    if (state === INotificationState.SUCCESS) return <CheckIcon />;
    if (state === INotificationState.FAIL) return <ExclamationTriangleIcon />;
    return <></>;
  };

  return { notifications, getIcon };
};
