'use client';
import React, { useEffect } from 'react';
import { Container } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import { initializeStorage } from '@/utils/localStorage';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';

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
  }, []);

  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};

export default App;
