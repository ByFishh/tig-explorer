import React from 'react';
import { Button } from '@radix-ui/themes';
import { UploadIcon } from '@radix-ui/react-icons';
import { useImportExcel } from './ImportExcel.logic';

const ImportExcel = (props: { title: string }) => {
  const logic = useImportExcel();

  return (
    <>
      <input
        ref={logic.inpRef}
        type="file"
        accept=".xlsx"
        onChange={logic.handleFileUpload}
        style={{
          pointerEvents: 'none',
          visibility: 'hidden',
          position: 'absolute',
        }}
      />
      <Button
        style={{ width: '100%', fontSize: '.8rem' }}
        mt="5"
        size="3"
        color="grass"
        onClick={() => logic.inpRef.current?.click()}
      >
        <UploadIcon /> {props.title}
      </Button>
    </>
  );
};

export default ImportExcel;
