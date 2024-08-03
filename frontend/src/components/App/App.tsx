'use client';
import React, { useEffect } from 'react';
import { Container } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import { initializeStorage } from '@/utils/localStorage';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import NodeDialog from '../NodeDialog/NodeDialog';
import DeleteDialog from '../DeleteDialog/DeleteDialog';

const Navbar = dynamic(() => import('../Navbar/Navbar'), {
  ssr: false,
});

const App = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useEffect(() => {
    initializeStorage({ key: ILocalStorageKey.NODES, defaultValue: [] });
    initializeStorage({ key: ILocalStorageKey.TIG_PRICE, defaultValue: 0 });
    initializeStorage({
      key: ILocalStorageKey.SHOW_INVALID_NODES,
      defaultValue: true,
    });
  }, []);

  return (
    <>
      <Navbar />
      <NodeDialog />
      <DeleteDialog />
      <Container>{children}</Container>
    </>
  );
};

export default App;
