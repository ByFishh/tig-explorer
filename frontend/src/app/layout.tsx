/* eslint-disable react/no-children-prop */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import App from '@/components/App/App';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tig explorer',
  description: 'You will find here all the information about your Tig node',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="dark" scaling="90%" style={{ minHeight: 'initial' }}>
          <App children={children} />
        </Theme>
      </body>
    </html>
  );
}
