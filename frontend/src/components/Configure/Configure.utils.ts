import { INodeInputs } from '@/types/INodeInputs/INodeInputs';

export const handleFormData = (data: INodeInputs) => {
  return {
    notes: data.notes ?? '',
    startDate: data.startDate || null,
    coreNumber: Number(data.coreNumber) || 0,
    serverCost: Number(data.serverCost) || 0,
  };
};
