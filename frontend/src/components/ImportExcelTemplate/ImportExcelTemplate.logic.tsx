import * as XLSX from 'xlsx';

export const useImportExcelTemplate = () => {
  const generateTemplate = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      [
        'Address',
        'Notes',
        'Start date dd/MM/yyyy ',
        'Core number',
        'Server cost ($/month)',
      ],
      ['', '', '', '', ''],
    ]);

    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'tig-explorer-template.xlsx');
  };

  return { generateTemplate };
};
