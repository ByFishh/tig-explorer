/* eslint-disable react/no-children-prop */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import App from '@/components/App/App';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'TIG Explorer',
    template: '%s - TIG Explorer',
  },
  description:
    'View and manage your TIG benchmarkers with a single click in an all-in-one dashboard',

  twitter: {
    card: 'summary_large_image',
    site: '@tigexplorer',
    title: 'TIG Explorer',
    description:
      'View and manage your TIG benchmarkers with a single click in an all-in-one dashboard',
    images:
      'https://res.cloudinary.com/e-tech-test/image/upload/v1723065076/banner_ip9jdf.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://tig-explorer.com/',
    locale: 'en_US',
    title: 'TIG Explorer',
    images:
      'https://res.cloudinary.com/e-tech-test/image/upload/v1723065076/banner_ip9jdf.png',
    description:
      'View and manage your TIG benchmarkers with a single click in an all-in-one dashboard',
    siteName: 'TIG Explorer',
  },
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
