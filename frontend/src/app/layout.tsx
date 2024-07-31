import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import { Theme, Container } from '@radix-ui/themes';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('../components/Navbar/Navbar'), {
  ssr: false,
});

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
        <Theme appearance="dark" scaling="90%">
          <Navbar />
          <Container>{children}</Container>
        </Theme>
      </body>
    </html>
  );
}
