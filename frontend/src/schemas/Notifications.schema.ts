import { INotificationState } from '@/types/INotificationState/INotificationState';
import { z } from 'zod';

export const notificationSchema = z.object({
  id: z.string().uuid(),
  state: z.nativeEnum(INotificationState),
  message: z.string(),
});
