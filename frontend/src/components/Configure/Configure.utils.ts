import { INodeInputs } from '@/types/INodeInputs/INodeInputs';

export const handleFormData = (data: INodeInputs): INodeInputs => {
  return {
    notes: data?.notes ?? '',
    startDate: data?.startDate || undefined,
    coreNumber: Number(data?.coreNumber) || 0,
    serverCost: Number(data?.serverCost) || 0,
  };
};
