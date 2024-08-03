import { INodeInputs } from '@/types/INodeInputs/INodeInputs';

export const handleFormData = (data: INodeInputs): INodeInputs => {
  return {
    id: data.id ?? '',
    notes: data?.notes ?? '',
    startDate: data?.startDate || undefined,
    coreNumber: Number(data?.coreNumber) || 0,
    serverCost: Number(data?.serverCost) || 0,
  };
};
