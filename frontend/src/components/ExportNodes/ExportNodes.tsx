import { UploadIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import React from 'react';
import { useExportNodes } from './ExportNodes.logic';

const ExportNodes = () => {
  const logic = useExportNodes();
  return (
    <Button
      style={{ fontSize: '.8rem' }}
      size="3"
      ml="3"
      color="grass"
      variant="ghost"
      onClick={logic.exportNodes}
    >
      <UploadIcon /> Export nodes to Excel
    </Button>
  );
};

export default ExportNodes;
