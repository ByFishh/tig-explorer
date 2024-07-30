import { INodeInputs } from '@/types/INodeInputs/INodeInputs';
import { useForm, SubmitHandler } from 'react-hook-form';
import { handleFormData } from './Configure.utils';

export const useConfigure = () => {
  const { handleSubmit, control } = useForm<INodeInputs>();

  const onSubmit: SubmitHandler<INodeInputs> = (data: INodeInputs) => {
    const item = handleFormData(data);
    // Handle create and edit mode
  };

  return { control, handleSubmit, onSubmit };
};
