import { useBenchmarkersData } from '@/hooks/useBenchmarkersData';
import { usebenchmarkers } from '@/store/benchmarkersReducer/benchmarkersReducer';
import { useTigPrice } from '@/store/tigPriceReducer/tigPriceReducer';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const useValidBenchmarkers = () => {
  const { handleSubmit, control } = useForm<{ search: string }>();
  const { getBenchmarkers, validBenchmarkersInformation } =
    useBenchmarkersData();
  const { benchmarkers } = usebenchmarkers();
  const { tigPrice } = useTigPrice();
  const [keyword, setKeyword] = useState<string>('');

  const onSubmit: SubmitHandler<{ search: string }> = (data: {
    search: string;
  }) => {
    setKeyword(data.search);
  };

  const getTableData = useMemo(() => {
    return getBenchmarkers.valid.filter((td) =>
      keyword === undefined
        ? td
        : td.id.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) && td,
    );
  }, [keyword, getBenchmarkers.valid]);

  return {
    tigPrice,
    getBenchmarkers,
    validBenchmarkersInformation,
    getTableData,
    benchmarkers,
    keyword,
    onSubmit,
    handleSubmit,
    control,
  };
};
