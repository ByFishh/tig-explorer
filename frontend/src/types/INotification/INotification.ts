import { notificationSchema } from '@/schemas/Notifications.schema';
import { z } from 'zod';

export type INotification = z.infer<typeof notificationSchema>;
