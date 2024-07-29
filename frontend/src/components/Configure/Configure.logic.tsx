import { INodeInputs } from '@/types/INodeInputs/INodeInputs';
import { useForm, SubmitHandler } from 'react-hook-form';

export const useConfigure = () => {
  const { handleSubmit, control } = useForm<INodeInputs>();

  const onSubmit: SubmitHandler<INodeInputs> = (data: INodeInputs) => {
    console.log(data);
  };

  return { control, handleSubmit, onSubmit };
};
