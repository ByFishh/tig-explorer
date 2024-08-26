import { Text } from '@radix-ui/themes';
import React from 'react';
import { useImportExcelTemplate } from './ImportExcelTemplate.logic';

const ImportExcelTemplate = () => {
  const logic = useImportExcelTemplate();

  return (
    <Text size="2" color="gray" mt="3">
      You can{' '}
      <span
        style={{
          textDecoration: 'underline',
          cursor: 'pointer',
          color: '#71d083',
        }}
        onClick={logic.generateTemplate}
      >
        download template from this link
      </span>{' '}
      and import your benchmarkers with Excel
    </Text>
  );
};

export default ImportExcelTemplate;
