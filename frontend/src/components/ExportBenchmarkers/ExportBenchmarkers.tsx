import { UploadIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import React from 'react';
import { useExportBenchmarkers } from './ExportBenchmarkers.logic';

const ExportBenchmarkers = () => {
  const logic = useExportBenchmarkers();
  return (
    <Button
      style={{ fontSize: '.8rem' }}
      size="3"
      ml="3"
      color="grass"
      variant="ghost"
      onClick={logic.exportBenchmarkers}
    >
      <UploadIcon /> Export benchmarkers to Excel
    </Button>
  );
};

export default ExportBenchmarkers;
