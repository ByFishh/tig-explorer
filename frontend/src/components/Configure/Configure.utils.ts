import { INodeInputs } from '@/types/INodeInputs/INodeInputs';
import { unformatDate } from '../../utils/formatDate';

export const handleFormData = (data: INodeInputs): INodeInputs => {
  return {
    id: data?.id ?? '',
    notes: data?.notes ?? '',
    startDate: unformatDate(data?.startDate) || '',
    coreNumber: Number(data?.coreNumber) || 0,
    serverCost: Number(data?.serverCost) || 0,
  };
};
