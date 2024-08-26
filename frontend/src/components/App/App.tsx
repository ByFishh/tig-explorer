'use client';
import React, { useEffect } from 'react';
import { Container } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import { initializeStorage } from '@/utils/localStorage';
import { ILocalStorageKey } from '@/types/ILocalStorageKey/ILocalStorageKey';
import DialogsContainer from '../DialogsContainer/DialogsContainer';
import Notifications from '../Notifications/Notifications';
import Footer from '../Footer/Footer';
import { TableDataContext } from '@/context/TableDataContext/TableDataContext';

const Navbar = dynamic(() => import('../Navbar/Navbar'), {
  ssr: false,
});

const App = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useEffect(() => {
    initializeStorage({ key: ILocalStorageKey.BENCHMARKERS, defaultValue: [] });
    initializeStorage({ key: ILocalStorageKey.TIG_PRICE, defaultValue: 0 });
    initializeStorage({
      key: ILocalStorageKey.SHOW_INVALID_BENCHMARKERS,
      defaultValue: true,
    });
  }, []);

  return (
    <TableDataContext>
      <Navbar />
      <DialogsContainer />
      <Notifications />
      <Container
        style={{
          minHeight: 'calc(100vh - 12rem)',
        }}
      >
        {children}
      </Container>
      <Footer />
    </TableDataContext>
  );
};

export default App;
