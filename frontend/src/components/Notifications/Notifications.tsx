import React from 'react';
import { useNotificationsLogic } from './Notifications.logic';
import { Callout } from '@radix-ui/themes';
import './Notifications.css';
import { INotificationState } from '@/types/INotificationState/INotificationState';

const Notifications = () => {
  const logic = useNotificationsLogic();

  return (
    <div className="notifications-container">
      {logic.notifications.map((n) => (
        <Callout.Root
          className="notifications-card"
          style={{
            background:
              n.state === INotificationState.SUCCESS ? '#3e7949' : '#b54548',
            color: 'white',
          }}
          key={n.id}
          mt="3"
          highContrast
        >
          <Callout.Icon>{logic.getIcon(n.state)}</Callout.Icon>
          <Callout.Text>{n.message}</Callout.Text>
        </Callout.Root>
      ))}
    </div>
  );
};

export default Notifications;
