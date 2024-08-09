import { useNodesData } from '@/hooks/useNodesData';
import { useNodes } from '@/store/nodesReducer/nodesReducer';
import { useTigPrice } from '@/store/tigPriceReducer/tigPriceReducer';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const useValidNodes = () => {
  const { handleSubmit, control } = useForm<{ search: string }>();
  const { getNodes, validNodesInformation } = useNodesData();
  const { nodes } = useNodes();
  const { tigPrice } = useTigPrice();
  const [keyword, setKeyword] = useState<string>('');

  const onSubmit: SubmitHandler<{ search: string }> = (data: {
    search: string;
  }) => {
    setKeyword(data.search);
  };

  const getTableData = useMemo(() => {
    return getNodes.valid.filter((td) =>
      keyword === undefined
        ? td
        : td.id.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) && td,
    );
  }, [keyword, getNodes.valid]);

  return {
    tigPrice,
    getNodes,
    validNodesInformation,
    getTableData,
    nodes,
    keyword,
    onSubmit,
    handleSubmit,
    control,
  };
};
