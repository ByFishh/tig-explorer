import * as XLSX from 'xlsx';
import { useTableData } from '@/store/tableDataReducer/tableDataReducer';
import { getCostPerTig } from '@/utils/getCostPerTig';
import { dateNow } from '@/utils/dateNow';

const headers = [
  'Address',
  'Total earned (TIG)',
  'Average earned (TIG/h)',
  'Cost per TIG ($)',
  'Server cost ($/m)',
  'Core number',
  'Start date',
  'Notes',
];

export const useExportBenchmarkers = () => {
  const { tableData } = useTableData();

  const exportBenchmarkers = () => {
    const getValidBenchmarkers = tableData.filter((td) => !td.invalid);
    const benchmarkers = getValidBenchmarkers.map((item) => {
      return [
        item.id,
        item.total_earned.toFixed(2),
        item.average_rewards.toFixed(2),
        getCostPerTig(item.serverCost, item.average_rewards).toFixed(2),
        item.serverCost,
        item.coreNumber,
        item.startDate,
        item.notes,
      ];
    });
    const date = dateNow();
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...benchmarkers]);
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, `tig-explorer-export-benchmarkers-${date}.xlsx`);
  };
  return { exportBenchmarkers };
};
