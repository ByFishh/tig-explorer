import { IBenchmarkerInputs } from '@/types/IBenchmarkerInputs/IBenchmarkerInputs';
import { useRef } from 'react';
import * as ls from '../../utils/localStorage';
import { format } from 'date-fns';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import * as XLSX from 'xlsx';
import { z } from 'zod';
import { removeDuplicate } from '@/utils/removeDuplicates';

const benchmarkerSchema = z.object({
  id: z.string().max(42).min(1),
  notes: z.string().optional().default(''),
  startDate: z.string().optional().nullable().default(null),
  coreNumber: z.number().optional().default(0),
  serverCost: z.coerce.number().default(0),
});

export const useImportExcel = () => {
  //Ref
  const inpRef = useRef<HTMLInputElement | null>(null);

  const excelDateToDate = (excelDate: number): string | null => {
    if (!excelDate) return null;
    const date = new Date(Date.UTC(0, 0, excelDate - 1));
    const formatDate = format(date, 'dd/MM/yyyy');
    return formatDate;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      const wb = XLSX.read(binaryStr, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];
      const benchmarkers = jsonData.slice(1).map((row: any[]) => ({
        id: row[0],
        notes: row[1],
        startDate: row[2] ? excelDateToDate(row[2]) : undefined,
        coreNumber: row[3] ? Number(row[3]) : undefined,
        serverCost: row[4] ? Number(row[4]) : 0,
      }));
      const removeBlanks = benchmarkers.filter((i) => i.id);
      const filteredData = removeDuplicate(removeBlanks);
      if (!filteredData) return;
      const datas = filteredData.map((benchmarker) => benchmarkerSchema.parse(benchmarker));
      setBenchmarkersToLocalStorage(datas);
    };
    reader.readAsBinaryString(file);
  };

  const setBenchmarkersToLocalStorage = (data: IBenchmarkerInputs[]) => {
    data.forEach((d) => {
      const isAlreadyHere = ls.findItemById({
        key: ILocalStorageKey.BENCHMARKERS,
        id: d.id,
      });
      if (isAlreadyHere) {
        ls.updateItem({ key: ILocalStorageKey.BENCHMARKERS, updatedItem: d });
      } else {
        ls.pushItem({ key: ILocalStorageKey.BENCHMARKERS, item: d });
      }
    });

    window.location.reload();
  };

  return { handleFileUpload, inpRef };
};
